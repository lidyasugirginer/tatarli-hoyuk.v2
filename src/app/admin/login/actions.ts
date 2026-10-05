"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export type LoginResult = {
  success: boolean;
  error?: string;
  role?: string;
};

export async function loginAction(
  prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const email = formData.get("email")?.toString()?.trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      success: false,
      error: "Lütfen e-posta ve şifrenizi girin.",
    };
  }

  try {
    const supabase = await createClient();

    // 1. Supabase Auth ile sunucu tarafında kimlik doğrulama
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !loginData?.user) {
      return {
        success: false,
        error: "E-posta veya şifre hatalı.",
      };
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

      return {
        success: false,
        error: "Bu hesabın yönetici yetkisi bulunmuyor.",
      };
    }

    return {
      success: true,
      role: adminRecord.role,
    };
  } catch {
    return {
      success: false,
      error: "Giriş yapılırken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }
}

