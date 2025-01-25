import Text from './Text';

export default {
  title: 'UI/Text',
  component: Text,
  argTypes: {
    children: {
      control: 'text',
      description: '텍스트 내용',
      defaultValue: { summary: '텍스트' },
    },
    fontSize: {
      control: 'text',
      description: '텍스트 크기',
      defaultValue: { summary: '22px' },
    },
    fontWeight: {
      control: 'text',
      description: '텍스트 굵기',
      defaultValue: { summary: 'bold' },
    },
    color: {
      control: 'select',
      options: ['black', 'white', 'gray', 'primary', 'secondary'],
      description: '텍스트 색상',
      defaultValue: { summary: 'black' },
    },
    highlight: {
      control: 'array',
      description: '강조할 텍스트',
      defaultValue: ['텍스트'],
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: "['텍스트']" },
      },
    },
    highlightColor: {
      control: 'select',
      options: ['black', 'white', 'gray', 'primary', 'secondary'],
      description: '강조 텍스트 색상',
      defaultValue: { summary: 'primary' },
    },
    lineBreakFlag: {
      control: 'text',
      description: '줄바꿈 플래그',
      defaultValue: { summary: '<br/>' },
    },
  },
  args: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'black',
    children: '텍스트',
    highlight: ['텍스트'],
    highlightColor: 'primary',
    lineBreakFlag: '<br/>',
  },
};

export const Default = (args) => <Text {...args} />;
