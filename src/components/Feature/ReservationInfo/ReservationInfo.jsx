/**
 * 예약 정보 컴포넌트
 *
 * @returns {JSX.Element} - 예약 정보 요소
 */

import { Button } from '@/components/UI/Button';
import { ConfirmModal } from '@/components/UI/ConfirmModal';
import { Text } from '@/components/UI/Text';
import { colors } from '@/constants/colors';
import useCancleReservationQuery from '@/hooks/query/useCancleReservationQuery';
import { format } from 'date-fns';
import { useState } from 'react';
const ReservationInfo = ({ reservation }) => {
  // 예약 취소 API 호출 함수
  const { cancelReservation } = useCancleReservationQuery(reservation.id);
  // 예약 취소 확인 모달 상태
  const [open, setOpen] = useState(false);
  // 예약 취소 버튼 클릭 시 확인 모달 열기
  const handleCancelReservation = () => {
    setOpen(true);
  };

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
          {`"${reservation.parkingLot}" 주차장`}
        </Text>
        {/* 주차면 번호 */}
        <Text fontSize="16px" fontWeight="bold" color="gray">
          {`${reservation.parkingSlotId}번 자리`}
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
          {`${format(reservation.created, 'yyyy-MM-dd HH:mm:ss')}`}
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
        <Button
          width="100px"
          fontSize="18px"
          btnColor="secondary"
          onClick={handleCancelReservation}
        >
          {'취소'}
        </Button>
      </div>

      {/* 예약 취소 확인 모달 */}
      <ConfirmModal
        open={open}
        onConfirm={() => cancelReservation(reservation.parkingSlotId)}
        description="예약을 취소하시겠어요?"
        showCancelButton={true}
        confirmButtonText="예약 취소"
        onCancel={() => setOpen(false)}
      />
    </div>
  );
};

export default ReservationInfo;
