import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Supporters from "@/components/layout/supporters";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Supporters />
      <Footer />
    </>
  );
}