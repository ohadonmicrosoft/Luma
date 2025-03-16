import "../src/styles/globals.css";
import { DirectionProvider } from '../src/contexts/DirectionContext';
import { withA11y } from '@storybook/addon-a11y';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
    },
    a11y: {
      // Accessibility configurations
      element: '#root',
      manual: false,
      config: {
        rules: [
          {
            id: 'color-contrast',
            reviewOnFail: true,
          },
        ],
      },
    },
  },
};

export const decorators = [
  withA11y,
  (Story) => (
    <DirectionProvider>
      <div className="p-4">
        <Story />
      </div>
    </DirectionProvider>
  ),
];

export default preview;
