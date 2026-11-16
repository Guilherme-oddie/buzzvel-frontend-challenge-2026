import Image from 'next/image';

const iconSources = {
  menu: { src: '/icons/menu.svg', size: 24 },
  close: { src: '/icons/close.svg', size: 24 },
  'arrow-right': { src: '/icons/arrow-right.svg', size: 20 },
  'arrow-right-light': { src: '/icons/arrow-right-light.svg', size: 20 },
} as const;

export type IconName = keyof typeof iconSources;

export interface IconProps {
  name: IconName;
}

export function Icon({ name }: IconProps) {
  const icon = iconSources[name];

  return (
    <Image src={icon.src} width={icon.size} height={icon.size} alt="" aria-hidden unoptimized />
  );
}

export default Icon;
