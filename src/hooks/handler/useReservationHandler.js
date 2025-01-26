import { useCallback, useState } from 'react';

/**
 * 주차장 예약 처리 로직을 담당하는 커스텀 훅
 *
 * @param {Function} createReservation - 예약 생성 API 호출 함수
 * @param {number} userId - 유저 아이디
 * @returns {Object} - 안내 문구와 버튼 상태를 관리하는 값과 함수
 */
const useReservationHandler = (createReservation, userId) => {
  const [resultMessage, setResultMessage] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false); // 확인 버튼만 보여질 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 예약 처리 함수
  const handleReservation = useCallback(
    async (slot) => {
      try {
        setIsLoading(true); // 로딩 상태 변경

        // 예약 생성 API 호출
        const response = await createReservation(slot.id, userId);
        // 서버 응답 결과 처리
        if (response.result) {
          setResultMessage(
            `예약을 완료했어요!<br/>${slot.id}번 자리를 확인하세요.`
          );
          setIsConfirmed(true); // 예약 성공 시 확인 버튼만 렌더링
        } else if (response.errorCode === 'ALREADY_RESERVED') {
          setResultMessage(
            `${slot.id}번 자리는 이미 예약되었어요.<br/>다른 자리를 선택해 주세요.`
          );
          setIsConfirmed(false); // 오류 상태 유지
        } else {
          setResultMessage(`문제가 발생했어요.<br/>빠르게 해결하겠습니다!`);
          setIsConfirmed(false); // 일반 오류 처리
        }
      } catch (error) {
        console.error('예약 처리 오류:', error);
        // 네트워크 오류 또는 API 호출 실패 처리
        setResultMessage(`문제가 발생했어요.<br/>빠르게 해결하겠습니다!`);
        setIsConfirmed(false); // 오류 상태 유지
      } finally {
        setIsLoading(false); // 로딩 상태 초기화
      }
    },
    [createReservation, userId]
  );

  return {
    resultMessage,
    isConfirmed,
    isLoading,
    handleReservation,
  };
};

export default useReservationHandler;
