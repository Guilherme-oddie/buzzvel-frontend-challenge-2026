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
  const mask = `url("${icon.src}") center / contain no-repeat`;

  return (
    <span
      aria-hidden
      className="inline-block shrink-0 bg-current"
      style={{
        width: icon.size,
        height: icon.size,
        mask,
        WebkitMask: mask,
        forcedColorAdjust: 'preserve-parent-color',
      }}
    />
  );
}

export default Icon;
