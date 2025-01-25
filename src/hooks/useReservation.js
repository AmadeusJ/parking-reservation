/**
 * useReservations.js
 * 주차장 예약 상태를 관리하는 React Query Hook
 * - 주차장 상태 조회, 예약 생성, 예약 취소, 예약 변경 기능 제공
 * - React Query를 사용하여 데이터 캐싱 및 자동 새로고침 지원
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import reservationApi from '../api/reservation';
import { queryConfig } from '../config'; // 쿼리 설정

export const useReservation = () => {
  const queryClient = useQueryClient();

  // 주차장 상태 조회
  const {
    data: parkingSlots,
    error: parkingSlotsError,
    isError: isParkingSlotsError,
    isPending: isParkingSlotsPending,
  } = useQuery({
    queryKey: ['parkingSlots'],
    queryFn: ({ signal }) => reservationApi.getParkingSlots({ signal }),
    staleTime: queryConfig.parkingSlots.staleTime, // 캐싱 유지 시간
    refetchInterval: queryConfig.parkingSlots.refetchInterval, // 캐싱 갱신 주기
  });

  // 예약 생성
  const {
    mutate: createReservation,
    error: createReservationError,
    isError: isCreateReservationError,
    isPending: isCreateReservationPending,
  } = useMutation({
    mutationFn: (parkingSlotId) =>
      reservationApi.createReservation(parkingSlotId),
    onSuccess: () => {
      // 예약 생성 성공 시 주차장 상태 조회 데이터 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['parkingSlots'] });
    },
  });

  // 예약 취소
  const {
    mutate: cancelReservation,
    error: cancelReservationError,
    isError: isCancelReservationError,
    isPending: isCancelReservationPending,
  } = useMutation({
    mutationFn: (parkingSlotId) =>
      reservationApi.cancelReservation(parkingSlotId),
    onSuccess: () => {
      // 예약 취소 성공 시 주차장 상태 조회 데이터 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['parkingSlots'] });
    },
  });

  // 예약 변경
  const {
    mutate: changeReservation,
    error: changeReservationError,
    isError: isChangeReservationError,
    isPending: isChangeReservationPending,
  } = useMutation({
    mutationFn: (parkingSlotId) =>
      reservationApi.changeReservation(parkingSlotId),
    onSuccess: () => {
      // 예약 변경 성공 시 주차장 상태 조회 데이터 자동 갱신
      queryClient.invalidateQueries({ queryKey: ['parkingSlots'] });
    },
  });

  // 나의 예약 목록 조회
  const {
    data: myReservations,
    error: myReservationsError,
    isError: isMyReservationsError,
    isPending: isMyReservationsPending,
  } = useQuery({
    queryKey: ['myReservations'],
    queryFn: ({ signal }) => reservationApi.getMyReservations({ signal }),
  });

  return {
    // 주차장 상태 조회
    parkingSlots,
    parkingSlotsError,
    isParkingSlotsError,
    isParkingSlotsPending,

    // 예약 생성
    createReservation,
    createReservationError,
    isCreateReservationError,
    isCreateReservationPending,

    // 예약 취소
    cancelReservation,
    cancelReservationError,
    isCancelReservationError,
    isCancelReservationPending,

    // 예약 변경
    changeReservation,
    changeReservationError,
    isChangeReservationError,
    isChangeReservationPending,

    // 나의 예약 목록 조회
    myReservations,
    myReservationsError,
    isMyReservationsError,
    isMyReservationsPending,
  };
};
