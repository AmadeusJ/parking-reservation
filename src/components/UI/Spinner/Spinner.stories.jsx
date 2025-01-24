import { GlobalPortalProvider } from '@/components/GlobalPortal';
import Spinner from './Spinner';

export default {
  title: 'UI/Spinner',
  component: Spinner,
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: '로딩 상태',
      defaultValue: false,
    },
  },
  args: {
    isLoading: true,
  },
};

export const Default = (args) => (
  <GlobalPortalProvider>
    <Spinner {...args} />
  </GlobalPortalProvider>
);
