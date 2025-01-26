/**
 * useGetMyReservation.js
 * 나의 예약 목록을 조회하는 React Query Hook
 */

import { useQuery } from '@tanstack/react-query';
import reservationApi from '../../api/reservation';

export const useGetMyReservation = (userId) => {
  const {
    data: myReservations,
    isPending: isMyReservationsPending,
    isError: isMyReservationsError,
    error: myReservationsError,
  } = useQuery({
    queryKey: ['myReservations', userId],
    queryFn: ({ queryKey, signal }) => {
      const [, userId] = queryKey; // queryKey에서 userId 추출
      return reservationApi.getMyReservation({ signal, userId });
    },
    select: (data) => data.data, // 나의 예약 목록 데이터 추출
    placeholderData: [], // 데이터를 가져오기 전 사용할 임시 값
    enabled: !!userId, // 예약 화면에서 예약 목록을 조회할 때만 쿼리 활성화
    staleTime: 1000 * 60 * 3, // 데이터 유효 시간 3분
    cacheTime: 1000 * 60 * 5, // 캐싱 유지 시간 5분
  });

  return {
    myReservations,
    isMyReservationsPending,
    isMyReservationsError,
    myReservationsError,
  };
};
