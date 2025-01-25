import { useMemo } from 'react';

/**
 * 주차장 통계 정보를 계산하는 훅
 *
 * @param {Array} parkingSlots - 주차장 상태 데이터 배열
 * @returns {Object} - 통계 데이터 (예약 가능 슬롯 수, 전체 슬롯 수, 유형별 슬롯 수)
 */
const useParkingStatistics = (parkingSlots) => {
  const statistics = useMemo(() => {
    if (!Array.isArray(parkingSlots)) return null;

    const totalSlots = parkingSlots.length; // 전체 슬롯 수
    const availableSlots = parkingSlots.filter(
      (slot) => slot.status !== '점유' && slot.status !== '예약'
    ).length; // 예약 가능 슬롯 수

    // 유형별 슬롯 계산
    const typeCounts = parkingSlots.reduce((acc, slot) => {
      if (!acc[slot.type]) acc[slot.type] = 0;
      acc[slot.type] += 1;
      return acc;
    }, {});

    return {
      totalSlots,
      availableSlots,
      typeCounts,
    };
  }, [parkingSlots]);

  return statistics;
};

export default useParkingStatistics;
