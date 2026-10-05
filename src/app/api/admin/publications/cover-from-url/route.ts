import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import dns from "node:dns/promises";
import net from "node:net";

const STORAGE_BUCKET = "tatarli-hoyuk-storage";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function isPrivateIp(ip: string): boolean {
  if (!net.isIP(ip)) return false;

  // IPv4 checks
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    const [b0, b1, b2, b3] = parts;

    // 0.0.0.0/8
    if (b0 === 0) return true;
    // 10.0.0.0/8
    if (b0 === 10) return true;
    // 127.0.0.0/8 (Loopback)
    if (b0 === 127) return true;
    // 169.254.0.0/16 (Link-local / Cloud metadata: 169.254.169.254)
    if (b0 === 169 && b1 === 254) return true;
    // 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)
    if (b0 === 172 && b1 >= 16 && b1 <= 31) return true;
    // 192.168.0.0/16
    if (b0 === 192 && b1 === 168) return true;
    // 100.64.0.0/10 (Carrier-Grade NAT)
    if (b0 === 100 && b1 >= 64 && b1 <= 127) return true;
    // 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 (TEST-NET)
    if (b0 === 192 && b1 === 0 && b2 === 2) return true;
    if (b0 === 198 && b1 === 51 && b2 === 100) return true;
    if (b0 === 203 && b1 === 0 && b2 === 113) return true;
    // 224.0.0.0/4 (Multicast) & 240.0.0.0/4 (Reserved)
    if (b0 >= 224) return true;

    return false;
  }

  // IPv6 checks
  if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    // Loopback / unspecified
    if (normalized === "::1" || normalized === "::") return true;
    // IPv4-mapped IPv6 (::ffff:127.0.0.1)
    if (normalized.startsWith("::ffff:")) {
      const ipv4Part = normalized.replace("::ffff:", "");
      if (net.isIPv4(ipv4Part)) {
        return isPrivateIp(ipv4Part);
      }
    }
    // Unique local address fc00::/7 (fc00:: - fdff::)
    if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
    // Link-local fe80::/10 (fe80:: - febf::)
    if (
      normalized.startsWith("fe8") ||
      normalized.startsWith("fe9") ||
      normalized.startsWith("fea") ||
      normalized.startsWith("feb")
    ) {
      return true;
    }
  }

  return false;
}

async function validateRemoteUrl(urlString: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    throw new Error("Geçersiz URL formatı.");
  }

  if (url.protocol !== "https:") {
    throw new Error("Yalnızca güvenli HTTPS bağlantıları kabul edilir.");
  }

  const hostname = url.hostname.toLowerCase();

  // Reject localhost and local network names
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".lan") ||
    hostname.endsWith(".home") ||
    hostname.endsWith(".corp")
  ) {
    throw new Error("Yerel veya dahili ağ adreslerine erişilemez.");
  }

  // If hostname is an IP directly
  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw new Error("Özel veya dahili IP adreslerine erişilemez.");
    }
    return url;
  }

  // Resolve hostname via DNS to ensure all IPs are public
  try {
    const addresses = await dns.lookup(hostname, { all: true });
    for (const record of addresses) {
      if (isPrivateIp(record.address)) {
        throw new Error("Özel veya dahili ağ hedeflerine erişilemez.");
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("erişilemez")) {
      throw err;
    }
    throw new Error("Hedef alan adı çözümlenemedi.");
  }

  return url;
}

function verifyImageMagicBytes(buf: Buffer, contentType: string): boolean {
  if (buf.length < 12) return false;

  if (contentType === "image/jpeg" || contentType === "image/jpg") {
    return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  }

  if (contentType === "image/png") {
    return (
      buf[0] === 0x89 &&
      buf[1] === 0x50 &&
      buf[2] === 0x4e &&
      buf[3] === 0x47 &&
      buf[4] === 0x0d &&
      buf[5] === 0x0a &&
      buf[6] === 0x1a &&
      buf[7] === 0x0a
    );
  }

  if (contentType === "image/webp") {
    const isRiff =
      buf[0] === 0x52 &&
      buf[1] === 0x49 &&
      buf[2] === 0x46 &&
      buf[3] === 0x46; // "RIFF"
    const isWebp =
      buf[8] === 0x57 &&
      buf[9] === 0x45 &&
      buf[10] === 0x42 &&
      buf[11] === 0x50; // "WEBP"
    return isRiff && isWebp;
  }

  return false;
}

async function fetchImageWithSafeRedirects(initialUrl: string): Promise<{
  buffer: Buffer;
  contentType: string;
  extension: string;
}> {
  let currentUrl = initialUrl;
  let response: Response | null = null;
  const maxRedirects = 3;

  for (let redirectCount = 0; redirectCount <= maxRedirects; redirectCount++) {
    const validatedUrl = await validateRemoteUrl(currentUrl);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      response = await fetch(validatedUrl.toString(), {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "image/webp,image/png,image/jpeg,image/*;q=0.8",
        },
        redirect: "manual",
        signal: controller.signal,
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error("Görsel indirme işlemi zaman aşımına uğradı.");
      }
      throw new Error("Görsel indirilemedi.");
    } finally {
      clearTimeout(timeout);
    }

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) {
        throw new Error("Yönlendirme adresi bulunamadı.");
      }
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    break;
  }

  if (!response || !response.ok) {
    throw new Error(`Görsel indirilemedi (HTTP ${response?.status || 0}).`);
  }

  const contentLength = response.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_BYTES) {
    throw new Error("Dosya boyutu çok büyük (en fazla 10 MB).");
  }

  const rawContentType = response.headers.get("content-type") || "";
  const contentType = rawContentType.split(";")[0].trim().toLowerCase();

  const extension = ALLOWED_MIME_TYPES[contentType];
  if (!extension) {
    throw new Error(
      "Desteklenmeyen dosya türü. Sadece JPG, PNG ve WebP kabul edilir."
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_BYTES) {
    throw new Error("Dosya boyutu çok büyük (en fazla 10 MB).");
  }
  if (arrayBuffer.byteLength === 0) {
    throw new Error("İndirilen görsel dosyası boş.");
  }

  const buffer = Buffer.from(arrayBuffer);

  const isValidMagic = verifyImageMagicBytes(buffer, contentType);
  if (!isValidMagic) {
    throw new Error("Dosya içeriği geçerli bir görsel formatı ile eşleşmiyor.");
  }

  return { buffer, contentType, extension };
}

export async function POST(request: NextRequest) {
  try {
    // 1. Session ve Admin yetki doğrulaması
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "Yetkisiz işlem: Oturum bulunamadı." },
        { status: 401 }
      );
    }

    const { data: adminRecord, error: adminError } = await supabase
      .from("admins")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      return NextResponse.json(
        {
          success: false,
          error: "Yetkisiz işlem: Bu hesaba ait yönetici yetkisi bulunmuyor.",
        },
        { status: 403 }
      );
    }

    // 2. Request body ayrıştırma
    const body = await request.json().catch(() => null);
    const imageUrl = body?.imageUrl?.toString()?.trim();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Lütfen bir görsel URL'si girin." },
        { status: 400 }
      );
    }

    // 3. Görseli güvenli SSRF koruması ile sunucu tarafında indir
    const { buffer, contentType, extension } =
      await fetchImageWithSafeRedirects(imageUrl);

    // 4. Supabase Storage bucket'ına yükle
    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `publications/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        {
          success: false,
          error: "Görsel depolama alanına yüklenemedi. Lütfen tekrar deneyin.",
        },
        { status: 500 }
      );
    }

    // 5. Kalıcı Supabase public URL'ini al ve döndür
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      publicUrl: urlData.publicUrl,
      fileName,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Görsel işlenirken beklenmeyen bir hata oluştu.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 }
    );
  }
}
