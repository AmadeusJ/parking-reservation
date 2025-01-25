/**
 * 텍스트 컴포넌트
 *
 * @param {object} props - 텍스트 속성
 * @param {string} [children] - 텍스트 내용
 * @param {string[]} [highlight=[]] - 강조할 텍스트
 * @param {string} [highlightColor='primary'] - 강조 텍스트 색상
 * @param {string} [lineBreakFlag='<br/>'] - 줄바꿈을 위한 플래그
 * @returns {JSX.Element} - 텍스트 요소
 */
import { colors } from '@/constants/colors';

const Text = ({
  children,
  highlight = [],
  highlightColor = 'primary',
  lineBreakFlag = '<br/>',
  ...props
}) => {
  const {
    fontSize = '22px',
    fontWeight = 'bold',
    color = 'black',
    ...rest
  } = props;

  // 텍스트를 강조 텍스트와 줄바꿈 플래그를 기준으로 분리
  const splitText = (text) => {
    const highlightRegex = new RegExp(`(${highlight.join('|')})`, 'g');
    const parts = text.split(lineBreakFlag);

    return parts.map((part, index) => {
      const subParts = part.split(highlightRegex); // 강조 텍스트만 추가 분리
      return (
        <span key={`line-${index}`}>
          {subParts.map((subPart, subIndex) =>
            highlight.includes(subPart) ? (
              <span
                key={`highlight-${index}-${subIndex}`}
                css={{
                  color: colors[highlightColor],
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                }}
                {...rest}
              >
                {subPart}
              </span>
            ) : (
              <span
                key={`text-${index}-${subIndex}`}
                css={{
                  color: colors[color],
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                }}
                {...rest}
              >
                {subPart}
              </span>
            )
          )}
          {index < parts.length - 1 && <br />} {/* 줄바꿈 처리 */}
        </span>
      );
    });
  };

  return <>{splitText(children)}</>;
};

export default Text;
