import Image from 'next/image';

const iconSources = {
  menu: '/icons/menu.svg',
  close: '/icons/close.svg',
} as const;

export type IconName = keyof typeof iconSources;

export interface IconProps {
  name: IconName;
}

export function Icon({ name }: IconProps) {
  return <Image src={iconSources[name]} width={24} height={24} alt="" aria-hidden unoptimized />;
}

export default Icon;
