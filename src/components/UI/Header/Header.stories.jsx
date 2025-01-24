import Header from './Header';

export default {
  title: 'Common/Header', // Storybook에서의 카테고리 및 이름
  component: Header, // 대상 컴포넌트
  subcomponents: { 'Header.Logo': Header.Logo }, // Header.Logo를 하위 컴포넌트로 추가
  argTypes: {
    src: {
      control: 'text',
      description: 'Logo 이미지 경로',
      defaultValue: { summary: '/logo.svg' },
    },
    alt: {
      control: 'text',
      description: 'Logo 이미지의 대체 텍스트',
      defaultValue: { summary: 'logo' },
    },
  },
  args: {
    src: '/logo.svg',
    alt: 'logo',
  },
};

/**
 * 기본 헤더 스토리
 *
 * @param {object} args - 헤더 속성
 * @returns {JSX.Element} - 헤더 요소
 */
export const Default = (args) => (
  <Header>
    <Header.Logo {...args} />
  </Header>
);
