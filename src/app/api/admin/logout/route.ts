import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const loginUrl = new URL("/admin/login", request.url);
  const response = NextResponse.redirect(loginUrl, { status: 303 });

  // Delete all Supabase auth cookies
  for (const cookie of allCookies) {
    if (cookie.name.includes("sb-") || cookie.name.includes("auth-token")) {
      response.cookies.delete(cookie.name);
      try {
        cookieStore.delete(cookie.name);
      } catch {
        // ignore
      }
    }
  }

  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

