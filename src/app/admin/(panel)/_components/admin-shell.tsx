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
  userEmail?: string;
  userRole?: string;
};

const menuItems = [
  {
    label: "Genel Bakış",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Haberler",
    href: "/admin/haberler",
    icon: Newspaper,
  },
  {
    label: "Yayınlar",
    href: "/admin/yayinlar",
    icon: BookOpen,
  },
  {
    label: "Buluntular",
    href: "/admin/buluntular",
    icon: Landmark,
  },
  {
    label: "Galeri",
    href: "/admin/galeri",
    icon: Images,
  },
];

const managementItems = [
  {
    label: "Kullanıcılar",
    href: "/admin/kullanicilar",
    icon: Users,
  },
  {
    label: "Ayarlar",
    href: "/admin/ayarlar",
    icon: Settings,
  },
];

const pageTitles: Record<string, string> = {
  "/admin": "Genel Bakış",

  "/admin/haberler": "Haberler",
  "/admin/haberler/yeni": "Yeni Haber",

  "/admin/yayinlar": "Yayınlar",
  "/admin/yayinlar/yeni": "Yeni Yayın",

  "/admin/buluntular": "Buluntular",
  "/admin/buluntular/yeni": "Yeni Buluntu",

  "/admin/galeri": "Galeri",
  "/admin/galeri/yeni": "Yeni Görsel",

  "/admin/kullanicilar": "Kullanıcılar",
  "/admin/ayarlar": "Ayarlar",
};

function getPageTitle(pathname: string) {
  if (pageTitles[pathname]) {
    return pageTitles[pathname];
  }

  if (
    pathname.startsWith("/admin/haberler/") &&
    pathname.endsWith("/duzenle")
  ) {
    return "Haberi Düzenle";
  }

  if (
    pathname.startsWith("/admin/yayinlar/") &&
    pathname.endsWith("/duzenle")
  ) {
    return "Yayını Düzenle";
  }

  if (
    pathname.startsWith("/admin/buluntular/") &&
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
      href: "/admin",
    },
  ];

  if (pathname === "/admin") {
    return breadcrumbs;
  }

  if (pathname.startsWith("/admin/haberler")) {
    breadcrumbs.push({
      label: "Haberler",
      href: "/admin/haberler",
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

  if (pathname.startsWith("/admin/yayinlar")) {
    breadcrumbs.push({
      label: "Yayınlar",
      href: "/admin/yayinlar",
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

  if (pathname.startsWith("/admin/buluntular")) {
    breadcrumbs.push({
      label: "Buluntular",
      href: "/admin/buluntular",
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

  if (pathname.startsWith("/admin/galeri")) {
    breadcrumbs.push({
      label: "Galeri",
      href: "/admin/galeri",
    });

    if (pathname.endsWith("/yeni")) {
      breadcrumbs.push({
        label: "Yeni Görsel",
        href: pathname,
      });
    }
  }

  if (pathname.startsWith("/admin/kullanicilar")) {
    breadcrumbs.push({
      label: "Kullanıcılar",
      href: "/admin/kullanicilar",
    });
  }

  if (pathname.startsWith("/admin/ayarlar")) {
    breadcrumbs.push({
      label: "Ayarlar",
      href: "/admin/ayarlar",
    });
  }

  return breadcrumbs;
}

export default function AdminShell({
  children,
  userEmail,
  userRole = "admin",
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
    if (href === "/admin") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  async function handleLogout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } catch {
      // ignore
    }

    window.location.replace("/admin/login");
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
          href="/admin"
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
            <div className={styles.userAvatar}>
              {userEmail ? userEmail.slice(0, 2).toUpperCase() : "AD"}
            </div>

            <div>
              <p className={styles.userName}>{userEmail || "Yönetici"}</p>
              <p className={styles.userRole}>{userRole}</p>
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