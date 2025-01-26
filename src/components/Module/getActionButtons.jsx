import Button from '../UI/Button/Button';

/**
 * 예약 및 취소 버튼 생성 유틸리티 함수
 * @param {string} action - 'reserve' 또는 'cancel' 중 하나
 * @param {Object} options - 상태 및 이벤트 핸들러
 * @returns {Array} - 렌더링할 버튼 JSX 배열
 */
export default function getActionButtons({
  action,
  isConfirmed,
  isCancelingReservationSuccess,
  handleReservation,
  cancelReservation,
  navigate,
  slot,
}) {
  if (isConfirmed || isCancelingReservationSuccess) {
    // 처리 완료 후 확인 버튼
    return [
      <Button key="confirm" onClick={() => navigate('/')}>
        확인
      </Button>,
    ];
  }

  if (action === 'reserve') {
    // 예약 버튼
    return [
      <Button key="cancel" btnColor="secondary" onClick={() => navigate('/')}>
        취소하기
      </Button>,
      <Button key="reserve" onClick={() => handleReservation(slot)}>
        예약하기
      </Button>,
    ];
  }

  if (action === 'cancel') {
    // 예약 취소 버튼
    return [
      <Button key="cancel" btnColor="secondary" onClick={() => navigate('/')}>
        취소하기
      </Button>,
      <Button
        key="cancel-reservation"
        onClick={() => cancelReservation(slot.id)}
      >
        예약 취소
      </Button>,
    ];
  }

  return null; // 기본적으로 버튼 없음
}
