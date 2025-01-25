/**
 * queryConfig.js
 * React Query 설정
 */

const queryConfig = {
  /**
   * 주차장 상태 조회 Query 설정
   */
  parkingSlots: {
    staleTime: 1000 * 60 * 5, // 5분
    refetchInterval: 1000 * 60 * 1, // 1분
  },

  /**
   * 나의 예약 목록 조회 Query 설정
   */
  myReservations: {
    staleTime: 1000 * 60 * 1, // 1분
    refetchInterval: 1000 * 60 * 1, // 1분
  },
};

export default queryConfig;
