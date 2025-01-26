/**
 * useGetParkinglotQuery.js
 * 주차장 상태 조회 기능을 제공하는 React Query Hook
 */

import { useQuery } from '@tanstack/react-query';
import reservationApi from '../../api/reservation';

export default function useGetParkinglotQuery() {
  const {
    data: parkingSlots,
    isPending: isParkingSlotsPending,
    isError: isParkingSlotsError,
    error: parkingSlotsError,
  } = useQuery({
    queryKey: ['parkingSlots'],
    queryFn: ({ signal }) => reservationApi.getParkingSlots({ signal }),
    select: (data) => data.parkingSlots, // 주차장 상태 데이터 선택
    placeholderData: [], // 데이터를 가져오기 전 사용할 임시 값
    refetchInterval: 1000 * 60 * 1, // 1분 마다 주차장 상태 조회
  });

  return {
    parkingSlots,
    isParkingSlotsPending,
    isParkingSlotsError,
    parkingSlotsError,
  };
}
