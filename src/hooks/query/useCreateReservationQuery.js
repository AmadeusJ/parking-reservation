/**
 * useCreateReservationQuery.js
 * 예약 생성 기능을 제공하는 React Query Hook
 */

import { useMutation } from '@tanstack/react-query';
import reservationApi, { queryClient } from '../../api/reservation';

/**
 * @param {parkingSlotId} - 예약할 주차장 슬롯 ID
 * @returns {Object} - 예약 생성 함수, 예약 생성 상태, 예약 생성 오류 상태, 예약 생성 오류
 */
export default function useCreateReservationQuery() {
  const {
    mutate: createReservation,
    isPending: isCreatingReservation,
    isError: isCreatingReservationError,
    error: createReservationError,
  } = useMutation({
    mutationFn: (parkingSlotId) =>
      reservationApi.createReservation(parkingSlotId),
    onSuccess: () => {
      // 예약 생성 성공 시 주차장 상태 조회 데이터 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['parkingSlots'] });

      // 예약 생성 성공 시 나의 예약 목록 데이터 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
  });

  return {
    createReservation,
    isCreatingReservation,
    isCreatingReservationError,
    createReservationError,
  };
}
