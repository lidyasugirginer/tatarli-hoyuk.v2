import InnerPageLayout from "@/components/shared/InnerPageLayout";

type Language = "tr" | "en";

type FindsPageProps = {
  language?: Language;
};

const content = {
  tr: {
    breadcrumb: "Buluntular",
    eyebrow: "Tatarlı Höyük Kazısı",
    title: "Buluntular",
    sections: [
      {
        number: "01",
        title: "Arkeolojik Buluntular",
        paragraphs: [
          "Bu alana Tatarlı Höyük kazılarında ele geçen arkeolojik buluntuların genel tanıtımı gelecek.",
        ],
      },
      {
        number: "02",
        title: "Buluntu Grupları",
        paragraphs: [
          "Seramik, mühür, figürin, metal, taş ve diğer buluntu grupları daha sonra bu bölümde tanıtılacak.",
        ],
      },
    ],
  },
  en: {
    breadcrumb: "Finds",
    eyebrow: "Tatarlı Höyük Excavation",
    title: "Finds",
    sections: [
      {
        number: "01",
        title: "Archaeological Finds",
        paragraphs: [
          "A general introduction to the archaeological finds recovered from the Tatarlı Höyük excavations will be presented in this section.",
        ],
      },
      {
        number: "02",
        title: "Find Groups",
        paragraphs: [
          "Pottery, seals, figurines, metal, stone, and other find categories will be presented in this section in due course.",
        ],
      },
    ],
  },
} as const;

export default function FindsPage({ language = "tr" }: FindsPageProps) {
  const t = content[language];

  return (
    <InnerPageLayout
      breadcrumb={t.breadcrumb}
      eyebrow={t.eyebrow}
      title={t.title}
      sections={t.sections}
      language={language}
    />
  );
}

