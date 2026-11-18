import Image from 'next/image';

export interface BrandLogoProps {
  tone?: 'default' | 'inverse';
}

export function BrandLogo({ tone = 'default' }: BrandLogoProps) {
  return (
    <Image
      src={tone === 'inverse' ? '/brand/luma-inverse.svg' : '/brand/luma.svg'}
      width={54}
      height={17}
      alt="Luma"
      unoptimized
    />
  );
}

export default BrandLogo;
