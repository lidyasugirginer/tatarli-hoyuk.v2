import { redirect } from "next/navigation";
import { createClient } from "./server";

export type AdminUser = {
  id: string;
  email?: string;
  role: string;
};

export async function requireAdmin(): Promise<{
  user: { id: string; email?: string };
  role: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const { data: adminRecord, error: adminError } = await supabase
    .from("admins")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !adminRecord) {
    // Auth hesabı var ancak admins tablosunda yetkisi yoksa oturumu kapat ve login'e yönlendir
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    role: adminRecord.role,
  };
}

