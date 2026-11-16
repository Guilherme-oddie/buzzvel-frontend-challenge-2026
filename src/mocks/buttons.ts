import type { ButtonSize, ButtonVariant } from '@/components/ui/atoms/Button';
import type { IconName } from '@/components/ui/atoms/Icon';

export interface ButtonSample {
  variant: ButtonVariant;
  label: string;
  icon?: IconName;
  mobileFullWidth?: boolean;
}

export const buttonSamples: readonly ButtonSample[] = [
  { variant: 'primary', label: 'Explore courses', mobileFullWidth: true },
  { variant: 'secondary', label: 'See how it works', mobileFullWidth: true },
  { variant: 'accent', label: 'View course', mobileFullWidth: true },
  { variant: 'text', label: 'Log in' },
  { variant: 'link', label: 'Explore', icon: 'arrow-right' },
  {
    variant: 'link-inverse',
    label: 'Browse all courses',
    icon: 'arrow-right-light',
    mobileFullWidth: true,
  },
  { variant: 'icon', label: 'Open menu', icon: 'menu' },
];

export const buttonSizeSamples: readonly { size: ButtonSize; label: string }[] = [
  { size: 'default', label: 'Explore courses' },
  { size: 'compact', label: 'Start learning' },
];

export const buttonStateLabels = {
  enabled: 'Send message',
  disabled: 'Disabled action',
  submitting: 'Sending message',
};
