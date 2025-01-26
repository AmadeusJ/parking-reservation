/**
 * useCancleReservationQuery.js
 * 예약 취소 기능을 제공하는 React Query Hook
 */

import { useMutation } from '@tanstack/react-query';
import reservationApi, { queryClient } from '../../api/reservation';

/**
 * @param {parkingSlotId} - 예약 취소할 주차장 슬롯 ID
 * @param {userId} - 유저 아이디
 * @returns {Object} - 예약 취소 함수, 예약 취소 상태, 예약 취소 오류 상태, 예약 취소 오류
 */
export default function useCancleReservationQuery(userId) {
  const {
    mutateAsync: cancelReservation,
    isPending: isCancelingReservation,
    isError: isCancelingReservationError,
    error: cancelReservationError,
    isSuccess: isCancelingReservationSuccess,
  } = useMutation({
    mutationFn: async (parkingSlotId) => {
      const response = await reservationApi.cancelReservation(
        parkingSlotId,
        userId
      );
      return response;
    },
    onSuccess: () => {
      // 예약 취소 성공 시 주차장 상태 조회 데이터 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['parkingSlots'] });

      // 예약 취소 성공 시 나의 예약 목록 데이터 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
  });

  return {
    cancelReservation,
    cancelReservationError,
    isCancelingReservation,
    isCancelingReservationError,
    isCancelingReservationSuccess,
  };
}
