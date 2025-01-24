/**
 * 텍스트 컴포넌트
 *
 * @param {object} props - 텍스트 속성
 * @param {string} [children] - 텍스트 내용
 * @param {string[]} [highlight=[]] - 강조할 텍스트
 * @param {string} [highlightColor='primary'] - 강조 텍스트 색상
 * @returns {JSX.Element} - 텍스트 요소
 */
import { colors } from '@/constants/colors';

const Text = ({
  children,
  highlight = [],
  highlightColor = 'primary',
  ...props
}) => {
  const {
    fontSize = '22px',
    fontWeight = 'bold',
    color = 'black',
    ...rest
  } = props;

  // 강조 텍스트가 없으면 기본 렌더링
  if (!highlight.length) {
    return (
      <span
        css={{
          fontSize: fontSize,
          fontWeight: fontWeight,
          color: colors[color],
        }}
        {...rest}
      >
        {children}
      </span>
    );
  }

  // 강조 텍스트가 있으면 강조 텍스트 렌더링
  const parts = children.split(new RegExp(`(${highlight.join('|')})`, 'g'));

  return parts.map((part, index) =>
    highlight.includes(part) ? (
      <span
        key={index}
        css={{
          color: colors[highlightColor],
          fontSize: fontSize,
          fontWeight: fontWeight,
        }}
        {...rest}
      >
        {part}
      </span>
    ) : (
      <span
        key={index}
        css={{
          color: colors[color],
          fontSize: fontSize,
          fontWeight: fontWeight,
        }}
        {...rest}
      >
        {part}
      </span>
    )
  );
};

export default Text;
