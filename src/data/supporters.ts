export type Supporter = {
  id: string;
  name: string;
  nameEn?: string;
  logo: string;
  url?: string;
  width?: number;
  height?: number;
};

export const supporters: Supporter[] = [
  {
    id: "destekci-1",
    name: "Çukurova Üniversitesi",
    logo: "/images/supporters/cukurova-uni_logo.png",
    url: "https://www.cu.edu.tr/",
  },
  {
    id: "destekci-2",
    name: "Adana İl Kültür ve Turizm Bakanlığı",
    logo: "/images/supporters/Ministry_of_Culture_and_Tourism_(Turkey)_logo.png",
    url: "https://adana.ktb.gov.tr/"
  },
];


