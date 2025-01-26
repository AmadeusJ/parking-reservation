/**
 * 주차장 통계 정보를 표시하는 컴포넌트
 *
 * @param {Object} statistics - 주차장 통계 데이터
 */
import { Text } from '@/components/UI/Text';
import { colors } from '@/constants/colors';
import { memo, useEffect, useState } from 'react';
const ParkingStatistics = ({ statistics }) => {
  const [availableColor, setAvailableColor] = useState(colors.gray);
  const { availableSlots, totalSlots, typeCounts } = statistics;

  // 유형별 색상 설정
  const typeColors = {
    여성: 'female',
    노약자: 'elderly',
    장애인: 'disabled',
    전기차: 'ev',
    일반: 'gray',
  };

  useEffect(() => {
    let availableColor = availableSlots > 0 ? 'unoccupied' : 'gray';
    setAvailableColor(availableColor);
  }, [availableSlots]);

  // 통계 데이터가 없으면 반환하지 않음
  if (!statistics) return null;

  // 주차장 통계 정보 표시
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <Text
        fontSize="20px"
        fontWeight="bold"
        highlight={[`${availableSlots}`]}
        highlightColor={availableColor}
      >
        {`예약 가능: ${availableSlots} / ${totalSlots}`}
      </Text>
      <ul
        css={{
          margin: '0',
          padding: '0',
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {Object.entries(typeCounts).map(([type, count], index) => {
          return (
            <Text
              key={index}
              fontSize="16px"
              highlight={[`${type}`]}
              highlightColor={typeColors[type] || colors.gray}
            >
              {`${type}: ${count}`}
            </Text>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(ParkingStatistics);
