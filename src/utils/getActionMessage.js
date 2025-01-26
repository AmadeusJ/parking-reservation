/**
 * 예약 및 취소 안내문구를 생성하는 유틸리티 함수
 * @param {string} action - 'reserve' 또는 'cancel' 중 하나
 * @param {Object} options - 기타 상태 및 메시지 데이터
 * @returns {string} - 생성된 안내문구
 */
export default function getActionMessage(
  action,
  {
    slot,
    resultMessage,
    isCancelingReservationSuccess,
    isCancelingReservationError,
  }
) {
  if (resultMessage) return resultMessage;

  if (action === 'reserve') {
    return `주차장의<br/>${slot.id}번 자리를 예약할께요.`;
  }

  if (action === 'cancel') {
    if (isCancelingReservationError) {
      return `문제가 생겨 취소하지 못했어요.<br/>빠르게 해결해드릴께요.`;
    }

    if (isCancelingReservationSuccess) {
      return `예약을 취소했어요.<br/>메인 화면으로 이동할께요.`;
    }

    return `주차장의<br/>${slot.id}번 자리를 예약을 취소할께요.`;
  }

  return '';
}
