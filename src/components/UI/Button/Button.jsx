/**
 * 버튼 컴포넌트
 *
 * @param {object} props - 버튼 속성
 * @param {string} [children] - 버튼 내용
 * @param {string} [btnColor='primary'] - 버튼 색상
 * @param {string} [width='250px'] - 버튼 너비
 * @param {string} [fontSize='22px'] - 버튼 폰트 크기
 * @returns {JSX.Element} - 버튼 요소
 */
import { btnColors, colors } from '@/constants/colors';
import { forwardRef } from 'react';

const Button = forwardRef(({ children, ...props }, ref) => {
  const {
    btnColor = 'primary',
    width = '250px',
    fontSize = '22px',
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',
        width: width,
        borderRadius: '10px',
        border: '0px solid transparent',
        cursor: 'pointer',
        backgroundColor: btnColors[btnColor].base,
        color: colors.white,
        fontSize: fontSize,
        fontWeight: 'bold',
        '&:disabled': {
          cursor: 'not-allowed',
        },
        '&:hover': {
          backgroundColor: btnColors[btnColor].hover,
        },
        '&:active': {
          backgroundColor: btnColors[btnColor].active,
        },
      }}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
