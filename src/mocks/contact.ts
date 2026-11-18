import type { ContactInfoCardProps } from '@/components/ui/molecules/ContactInfoCard';
import type { ContactFormLabels, ContactValues } from '@/components/ui/organism/ContactForm';
import { sectionHeadingExamples } from './sectionHeadings';

export const contactHeadingMock = sectionHeadingExamples.find(
  (sample) => sample.id === 'contact',
)!.heading;

export const contactCardsMock = [
  {
    icon: 'chat-bubble',
    label: 'Email',
    value: 'contact@luma.com',
    href: 'mailto:contact@luma.com',
  },
  {
    icon: 'clock',
    label: 'Response Time',
    value: 'Up to 24 hours on business days',
  },
] satisfies ContactInfoCardProps[];

export const contactFormLabelsMock = {
  fullName: 'Full name',
  email: 'Email',
  question: 'Your question',
  fullNamePlaceholder: 'Your name',
  emailPlaceholder: 'youremail@example.com',
  questionPlaceholder: 'Tell us how we can help...',
  submit: 'Send message',
  pending: 'Sending...',
  success: 'Demo submission complete. No message was sent.',
  error: 'The demo submission failed. Please try again.',
  required: 'This field is required.',
  invalidEmail: 'Enter a valid email address.',
} satisfies ContactFormLabels;

export const contactValuesMock = {
  fullName: 'Alex Morgan',
  email: 'alex@example.com',
  question: 'Which course would you recommend for a beginner?',
} satisfies ContactValues;

export const contactFormMock = {
  title: 'Contact us',
  description: 'Demo form. No messages are sent or saved.',
  labels: contactFormLabelsMock,
};
