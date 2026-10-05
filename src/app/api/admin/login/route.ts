import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = body?.email?.toString()?.trim();
    const password = body?.password?.toString();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Lütfen e-posta ve şifrenizi girin." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. Supabase Auth ile sunucu tarafında kimlik doğrulama
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !loginData?.user) {
      return NextResponse.json(
        { success: false, error: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    // 2. public.admins tablosunda yetki kontrolü
    const { data: adminRecord, error: adminError } = await supabase
      .from("admins")
      .select("role")
      .eq("user_id", loginData.user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      // Yetkisiz kullanıcı: oturumu hemen sonlandır ve cookie'leri temizle
      await supabase.auth.signOut();

      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      for (const cookie of allCookies) {
        if (cookie.name.includes("sb-") || cookie.name.includes("auth-token")) {
          try {
            cookieStore.delete(cookie.name);
          } catch {
            // ignore
          }
        }
      }

      return NextResponse.json(
        {
          success: false,
          error: "Bu hesabın yönetici yetkisi bulunmuyor.",
        },
        { status: 403 }
      );
    }

    // 3. Başarılı giriş: session cookie'leri createClient() içindeki cookieStore.set ile yazıldı
    const response = NextResponse.json({
      success: true,
      role: adminRecord.role,
    });

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Giriş yapılırken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      },
      { status: 500 }
    );
  }
}

