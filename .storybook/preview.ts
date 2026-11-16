import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      options: {
        desktop: {
          name: 'Desktop reference (1280px)',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
        mobile: {
          name: 'Mobile reference (402px)',
          styles: { width: '402px', height: '874px' },
          type: 'mobile',
        },
      },
    },
    a11y: {
      test: 'error',
    },
  },
};

export default preview;
