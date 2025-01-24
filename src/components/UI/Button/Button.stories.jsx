import { Button } from './index';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    btnColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '버튼 색상',
      defaultValue: { summary: 'primary' },
    },
    width: {
      control: 'text',
      description: '버튼 너비',
      defaultValue: { summary: '250px' },
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
      defaultValue: { summary: '버튼' },
    },
  },
  args: {
    btnColor: 'primary',
    width: '250px',
    children: '버튼',
  },
};

export const Default = (args) => <Button {...args} />;
