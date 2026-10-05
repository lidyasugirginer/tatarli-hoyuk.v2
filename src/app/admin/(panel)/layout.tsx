import { requireAdmin } from "@/lib/supabase/require-admin";
import AdminShell from "./_components/admin-shell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  // Server-side strict auth guard: guarantees no unauthenticated access
  const { user, role } = await requireAdmin();

  return (
    <AdminShell userEmail={user.email} userRole={role}>
      {children}
    </AdminShell>
  );
}