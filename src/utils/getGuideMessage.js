/**
 * 주차장 예약 페이지 안내문구를 생성하는 유틸리티 함수
 * @param {Object} statistics - 주차장 통계 데이터
 * @returns {string} - 생성된 안내문구
 */
export default function getGuideMessage(statistics) {
  if (!statistics) {
    return '주차장 정보를 불러오는 중이에요.<br/>잠시만 기다려 주세요.';
  }

  if (statistics.availableSlots > 0 && !statistics.hasReservation) {
    return '주차 예약이 가능해요.<br/>원하시는 자리를 선택해 주세요.';
  }

  if (statistics.availableSlots === 0) {
    return '현재 주차 예약이 어려워요.<br/>잠시 후 다시 확인해 주세요.';
  }

  if (statistics.hasReservation) {
    return `예약 중이신 자리가 있어요.<br/>취소 후 다른 자리로 변경이 가능해요.`;
  }

  return '';
}
