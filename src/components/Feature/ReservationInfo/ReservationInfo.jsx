/**
 * 예약 정보 컴포넌트
 *
 * @returns {JSX.Element} - 예약 정보 요소
 */

import { Button } from '@/components/UI/Button';
import { Text } from '@/components/UI/Text';
import { colors } from '@/constants/colors';

const ReservationInfo = ({ reservation }) => {
  return (
    // 예약 정보 컨테이너
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        padding: '10px',
        border: `2px solid ${colors.primary}`,
        borderRadius: '10px',
        width: '100%',
      }}
    >
      {/* 주차장 정보 */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-start',
          width: '30%',
          flex: 1,
          padding: '7px',
          paddingLeft: '30px',
        }}
      >
        {/* 주차장 이름 */}
        <Text fontSize="22px" fontWeight="bold" color="black">
          {reservation.parkingName}
        </Text>
        {/* 주차면 번호 */}
        <Text fontSize="16px" fontWeight="bold" color="gray">
          {reservation.parkingSlotId}
        </Text>
      </div>

      {/* 예약 일시 */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '30%',
          flex: 1,
        }}
      >
        <Text fontSize="16px" color="gray">
          {reservation.reservationDate}
        </Text>
      </div>

      {/* Action Buttons */}
      <div
        css={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Button width="100px" fontSize="18px">
          변경
        </Button>
        <Button width="100px" fontSize="18px" btnColor="secondary">
          취소
        </Button>
      </div>
    </div>
  );
};

export default ReservationInfo;
