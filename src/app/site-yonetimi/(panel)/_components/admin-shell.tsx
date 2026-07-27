"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Newspaper,
  BookOpen,
  Landmark,
  Images,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import styles from "../layout.module.css";

type AdminShellProps = {
  children: React.ReactNode;
};

const menuItems = [
  {
    label: "Genel Bakış",
    href: "/site-yonetimi",
    icon: LayoutDashboard,
  },
  {
    label: "Haberler",
    href: "/site-yonetimi/haberler",
    icon: Newspaper,
  },
  {
    label: "Yayınlar",
    href: "/site-yonetimi/yayinlar",
    icon: BookOpen,
  },
  {
    label: "Buluntular",
    href: "/site-yonetimi/buluntular",
    icon: Landmark,
  },
  {
    label: "Galeri",
    href: "/site-yonetimi/galeri",
    icon: Images,
  },
];

const managementItems = [
  {
    label: "Kullanıcılar",
    href: "/site-yonetimi/kullanicilar",
    icon: Users,
  },
  {
    label: "Ayarlar",
    href: "/site-yonetimi/ayarlar",
    icon: Settings,
  },
];

const pageTitles: Record<string, string> = {
  "/site-yonetimi": "Genel Bakış",

  "/site-yonetimi/haberler": "Haberler",
  "/site-yonetimi/haberler/yeni": "Yeni Haber",

  "/site-yonetimi/yayinlar": "Yayınlar",
  "/site-yonetimi/yayinlar/yeni": "Yeni Yayın",

  "/site-yonetimi/buluntular": "Buluntular",
  "/site-yonetimi/buluntular/yeni": "Yeni Buluntu",

  "/site-yonetimi/galeri": "Galeri",
  "/site-yonetimi/galeri/yeni": "Yeni Görsel",

  "/site-yonetimi/kullanicilar": "Kullanıcılar",
  "/site-yonetimi/ayarlar": "Ayarlar",
};

function getPageTitle(pathname: string) {
  if (pageTitles[pathname]) {
    return pageTitles[pathname];
  }

  if (
    pathname.startsWith("/site-yonetimi/haberler/") &&
    pathname.endsWith("/duzenle")
  ) {
    return "Haberi Düzenle";
  }

  if (
    pathname.startsWith("/site-yonetimi/yayinlar/") &&
    pathname.endsWith("/duzenle")
  ) {
    return "Yayını Düzenle";
  }

  if (
    pathname.startsWith("/site-yonetimi/buluntular/") &&
    pathname.endsWith("/duzenle")
  ) {
    return "Buluntuyu Düzenle";
  }

  return "Yönetim Paneli";
}

function getBreadcrumbs(pathname: string) {
  const breadcrumbs = [
    {
      label: "Genel Bakış",
      href: "/site-yonetimi",
    },
  ];

  if (pathname === "/site-yonetimi") {
    return breadcrumbs;
  }

  if (pathname.startsWith("/site-yonetimi/haberler")) {
    breadcrumbs.push({
      label: "Haberler",
      href: "/site-yonetimi/haberler",
    });

    if (pathname.endsWith("/yeni")) {
      breadcrumbs.push({
        label: "Yeni Haber",
        href: pathname,
      });
    }

    if (pathname.endsWith("/duzenle")) {
      breadcrumbs.push({
        label: "Haberi Düzenle",
        href: pathname,
      });
    }
  }

  if (pathname.startsWith("/site-yonetimi/yayinlar")) {
    breadcrumbs.push({
      label: "Yayınlar",
      href: "/site-yonetimi/yayinlar",
    });

    if (pathname.endsWith("/yeni")) {
      breadcrumbs.push({
        label: "Yeni Yayın",
        href: pathname,
      });
    }

    if (pathname.endsWith("/duzenle")) {
      breadcrumbs.push({
        label: "Yayını Düzenle",
        href: pathname,
      });
    }
  }

  if (pathname.startsWith("/site-yonetimi/buluntular")) {
    breadcrumbs.push({
      label: "Buluntular",
      href: "/site-yonetimi/buluntular",
    });

    if (pathname.endsWith("/yeni")) {
      breadcrumbs.push({
        label: "Yeni Buluntu",
        href: pathname,
      });
    }

    if (pathname.endsWith("/duzenle")) {
      breadcrumbs.push({
        label: "Buluntuyu Düzenle",
        href: pathname,
      });
    }
  }

  if (pathname.startsWith("/site-yonetimi/galeri")) {
    breadcrumbs.push({
      label: "Galeri",
      href: "/site-yonetimi/galeri",
    });

    if (pathname.endsWith("/yeni")) {
      breadcrumbs.push({
        label: "Yeni Görsel",
        href: pathname,
      });
    }
  }

  if (pathname.startsWith("/site-yonetimi/kullanicilar")) {
    breadcrumbs.push({
      label: "Kullanıcılar",
      href: "/site-yonetimi/kullanicilar",
    });
  }

  if (pathname.startsWith("/site-yonetimi/ayarlar")) {
    breadcrumbs.push({
      label: "Ayarlar",
      href: "/site-yonetimi/ayarlar",
    });
  }

  return breadcrumbs;
}

export default function AdminShell({
  children,
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
  useState(false);

  useEffect(() => {
  setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
  document.body.style.overflow = isMobileMenuOpen
    ? "hidden"
    : "";

  return () => {
    document.body.style.overflow = "";
  };
}, [isMobileMenuOpen]);

  const pageTitle = getPageTitle(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);

  function isMenuActive(href: string) {
    if (href === "/site-yonetimi") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  async function handleLogout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      window.alert("Çıkış yapılırken bir hata oluştu.");
      return;
    }

    router.replace("/site-yonetimi/giris");
    router.refresh();
  }

 return (
  <div className={styles.panel}>
    <button
      type="button"
      className={styles.mobileMenuButton}
      onClick={() => setIsMobileMenuOpen(true)}
      aria-label="Yönetim menüsünü aç"
      aria-expanded={isMobileMenuOpen}
    >
      <Menu size={23} />
    </button>

    <button
      type="button"
      className={`${styles.mobileOverlay} ${
        isMobileMenuOpen ? styles.mobileOverlayVisible : ""
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
      aria-label="Menüyü kapat"
    />

    <aside
      className={`${styles.sidebar} ${
        isMobileMenuOpen ? styles.sidebarOpen : ""
      }`}
    >
      <div className={styles.mobileSidebarHeader}>
        <span>Yönetim Menüsü</span>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Yönetim menüsünü kapat"
        >
          <X size={22} />
        </button>
      </div>
        <Link
          href="/site-yonetimi"
          className={styles.brand}
          aria-label="Genel Bakış sayfasına dön"
        >
          <div className={styles.brandMark}>TH</div>

          <div>
            <p className={styles.brandTitle}>Tatarlı Höyük</p>
            <p className={styles.brandSubtitle}>Yönetim Paneli</p>
          </div>
        </Link>

        <nav className={styles.navigation}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isMenuActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.menuItem} ${
                  active ? styles.active : ""
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className={styles.menuSection}>
            <p className={styles.sectionTitle}>Yönetim</p>

            {managementItems.map((item) => {
              const Icon = item.icon;
              const active = isMenuActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.menuItem} ${
                    active ? styles.active : ""
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>SA</div>

            <div>
              <p className={styles.userName}>Super Admin</p>
              <p className={styles.userRole}>super_admin</p>
            </div>
          </div>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <LogOut size={17} />
            <span>Çıkış yap</span>
          </button>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
  <div className={styles.mobileTopbarBrand}>
    <button
      type="button"
      className={styles.mobileTopbarMenu}
      onClick={() => setIsMobileMenuOpen(true)}
      aria-label="Yönetim menüsünü aç"
    >
      <Menu size={22} />
    </button>

    <div>
      <p>Tatarlı Höyük</p>
      <span>Yönetim Paneli</span>
    </div>
  </div>

  <div className={styles.topbarPageInfo}>
            <div className={styles.breadcrumbs}>
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <div
                    key={`${item.href}-${item.label}`}
                    className={styles.breadcrumbItem}
                  >
                    {index > 0 ? (
                      <ChevronRight size={13} />
                    ) : null}

                    {isLast ? (
                      <span>{item.label}</span>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </div>
                );
              })}
            </div>

            <h1 className={styles.topbarTitle}>
              {pageTitle}
            </h1>
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.websiteLink}
          >
            Siteyi görüntüle
          </Link>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}