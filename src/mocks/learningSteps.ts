import type { LearningStepCardProps } from '@/components/ui/molecules/LearningStepCard';

export const learningStepsMock = [
  {
    variant: 'blue',
    stepLabel: 'Step 01',
    title: 'Choose your focus',
    description:
      'Find courses based on the skill you want to build, not endless content categories.',
  },
  {
    variant: 'coral',
    stepLabel: 'Step 02',
    title: 'Learn from experience',
    description: 'Follow concise lessons created by professionals who use these skills.',
  },
  {
    variant: 'yellow',
    stepLabel: 'Step 03',
    title: 'Put it into practice',
    description:
      'Every course includes practical exercises designed to turn knowledge into action.',
  },
] satisfies readonly LearningStepCardProps[];

export const mobileLearningStepsMock = [
  learningStepsMock[0],
  {
    ...learningStepsMock[1],
    description: 'Follow concise lessons created by professionals who actually use these skills.',
  },
  learningStepsMock[2],
] satisfies readonly LearningStepCardProps[];
