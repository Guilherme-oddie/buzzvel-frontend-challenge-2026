import Image from 'next/image';
import type { CSSProperties, HTMLAttributes } from 'react';
import styles from './ImageCollage.module.css';

export interface ImageCollagePhoto {
  src: string;
  alt: string;
  objectPosition?: CSSProperties['objectPosition'];
}

export type ImageCollagePhotos = readonly [
  ImageCollagePhoto,
  ImageCollagePhoto,
  ImageCollagePhoto,
  ImageCollagePhoto,
  ImageCollagePhoto,
  ImageCollagePhoto,
  ImageCollagePhoto,
  ImageCollagePhoto,
  ImageCollagePhoto,
  ImageCollagePhoto,
];

export interface ImageCollageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  photos: ImageCollagePhotos;
}

export function ImageCollage({ photos, className, ...props }: ImageCollageProps) {
  return (
    <div
      role="group"
      aria-label="Photo collage"
      {...props}
      className={[styles.collage, className].filter(Boolean).join(' ')}
    >
      <div aria-hidden className={styles.circle} />
      <div className={styles.photoLayer}>
        {photos.map(({ src, alt, objectPosition }, index) => (
          <div className={styles.photo} key={`${src}-${index}`}>
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              sizes="150px"
              className="object-cover"
              style={{ objectPosition }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCollage;
