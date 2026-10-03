import Image from "next/image";

import styles from "./image-collage.module.css";

type CollageImage = {
  src: string;
  alt: string;
};

type ImageCollageProps = {
  images: readonly CollageImage[] | CollageImage[];
};

export default function ImageCollage({
  images,
}: ImageCollageProps) {
  const visibleImages = images.slice(0, 4);

  return (
    <div
      className={`${styles.collage} ${
        styles[`count${visibleImages.length}`]
      }`}
    >
      {visibleImages.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className={styles.imageItem}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>
      ))}
    </div>
  );
}