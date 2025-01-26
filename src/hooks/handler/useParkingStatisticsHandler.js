import { useMemo } from 'react';

/**
 * 주차장 통계 정보를 계산하는 커스텀 훅
 *
 * @param {Array} parkingSlots - 주차장 상태 데이터 배열
 * @returns {Object} - 통계 데이터 (예약 가능 슬롯 수, 전체 슬롯 수, 유형별 슬롯 수, 예약 여부)
 */
const useParkingStatistics = (parkingSlots) => {
  const statistics = useMemo(() => {
    // 유효한 배열인지 확인
    if (!Array.isArray(parkingSlots)) return null;

    // 전체 슬롯 수 계산
    const totalSlots = parkingSlots.length;

    // 예약 가능 슬롯 수 계산 (점유 또는 예약 상태가 아닌 슬롯)
    const availableSlots = parkingSlots.filter(
      ({ status }) => status !== '점유' && status !== '예약'
    ).length;

    // 유형별 슬롯 수 계산
    const typeCounts = parkingSlots.reduce((counts, { type }) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});

    // 예약된 슬롯 정보 추출
    const reservedSlot = parkingSlots.find(({ status }) => status === '예약');
    const hasReservation = !!reservedSlot; // 예약된 슬롯 여부
    const mySlotId = reservedSlot?.id; // 예약된 슬롯 ID

    // 통계 데이터 반환
    return {
      totalSlots, // 전체 슬롯 수
      availableSlots, // 예약 가능 슬롯 수
      typeCounts, // 유형별 슬롯 수
      hasReservation, // 예약된 슬롯 여부
      mySlotId, // 내 예약 슬롯 ID
    };
  }, [parkingSlots]);

  return statistics;
};

export default useParkingStatistics;
