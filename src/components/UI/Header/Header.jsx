/**
 * 헤더 컴포넌트
 *
 * @param {object} children - 헤더 내부 컴포넌트
 * @returns {JSX.Element} - 헤더 요소
 */
const Header = ({ children }) => {
  return (
    <header
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        padding: '30px',
      }}
    >
      {children}
    </header>
  );
};

/**
 * 로고 이미지 컴포넌트
 *
 * @param {string} src - 로고 이미지 경로
 * @param {string} alt - 로고 이미지의 대체 텍스트
 * @param {object} props - 추가적인 속성
 * @returns {JSX.Element} - 로고 이미지 요소
 */
const Logo = ({ src = '/logo.svg', alt = 'logo', ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

Header.Logo = Logo;

export default Header;
