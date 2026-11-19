import { Button } from '@/components/ui/atoms/Button';
import type { NavigationItem } from '@/types/navigation';

export interface NavigationListProps {
  items: readonly NavigationItem[];
  orientation?: 'horizontal' | 'vertical';
  activeHref?: string;
  onSelect?: (item: NavigationItem) => void;
}

export function NavigationList({
  items,
  orientation = 'horizontal',
  activeHref,
  onSelect,
}: NavigationListProps) {
  const isVertical = orientation === 'vertical';

  return (
    <ul className={isVertical ? 'flex flex-col' : 'flex items-center gap-8'}>
      {items.map((item, index) => (
        <li
          key={`${item.href}-${index}`}
          className={isVertical ? 'border-b border-line/60 last:border-0' : ''}
        >
          <Button
            href={item.href}
            variant="text"
            aria-current={activeHref === item.href ? 'location' : undefined}
            className={
              isVertical
                ? 'w-full justify-start rounded-none py-3.5 aria-[current=location]:text-primary aria-[current=location]:hover:text-primary'
                : 'aria-[current=location]:text-primary aria-[current=location]:hover:text-primary'
            }
            onClick={() => onSelect?.(item)}
          >
            {item.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default NavigationList;
