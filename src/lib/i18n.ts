export type Language = "tr" | "en";

export const siteTranslations = {
  tr: {
    brand: {
      title: "Tatarlı Höyük",
      subtitle: "Kazısı",
    },

    navigation: [
      { href: "/hakkinda", label: "Hakkında" },
      { href: "/haberler", label: "Haberler" },
      { href: "/buluntular", label: "Buluntular" },
      { href: "/yayinlar", label: "Yayınlar" },
      { href: "/galeri", label: "Galeri" },
      { href: "/iletisim", label: "İletişim" },
    ],

    common: {
      readMore: "Devamını Oku",
      back: "Geri Dön",
      viewAll: "Tümünü Gör",
    },
  },

  en: {
    brand: {
      title: "Tatarlı Höyük",
      subtitle: "Excavation",
    },

    navigation: [
      { href: "/en/about", label: "About" },
      { href: "/en/news", label: "News" },
      { href: "/en/finds", label: "Finds" },
      {
        href: "/en/publications",
        label: "Publications",
      },
      { href: "/en/gallery", label: "Gallery" },
      { href: "/en/contact", label: "Contact" },
    ],

    common: {
      readMore: "Read More",
      back: "Back",
      viewAll: "View All",
    },
  },
} as const;

export const routePairs = [
  { tr: "/", en: "/en" },
  { tr: "/hakkinda", en: "/en/about" },
  { tr: "/haberler", en: "/en/news" },
  { tr: "/buluntular", en: "/en/finds" },
  { tr: "/yayinlar", en: "/en/publications" },
  { tr: "/galeri", en: "/en/gallery" },
  { tr: "/iletisim", en: "/en/contact" },
  {
    tr: "/kizzuwatna/bilec-hoyuk-kurtarma-kazisi",
    en: "/en/kizzuwatna/bilec-hoyuk-rescue-excavation",
  },
  {
    tr: "/kizzuwatna/yuzey-arastirmalari/adana",
    en: "/en/kizzuwatna/surveys/adana",
  },
  {
    tr: "/kizzuwatna/yuzey-arastirmalari/kayseri",
    en: "/en/kizzuwatna/surveys/kayseri",
  },
  { tr: "/kizzuwatna", en: "/en/kizzuwatna" },
] as const;