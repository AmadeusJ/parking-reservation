import { colors } from '@/constants/colors';
import { useEffect, useMemo } from 'react';

/**
 * 주차 지도 스타일링을 처리하는 커스텀 훅
 *
 * @description
 * - 주차장 상태 데이터를 기반으로 SVG 주차 지도에서 각 주차 슬롯의 스타일을 업데이트합니다.
 * - 특정 슬롯 상태에 따라 색상을 설정 (점유, 예약, 비점유 상태).
 * - 슬롯 그룹에 클릭 이벤트를 추가하여 상위로 콜백 전달.
 *
 * @param {React.MutableRefObject<null>} svgContainerRef - 주차 지도 컨테이너의 ref
 * @param {Array} parkingSlots - 주차장 상태 데이터 (id, status 포함)
 * @param {Function} onSlotClick - 슬롯 클릭 시 호출되는 콜백 함수
 */
const useParkingLotMap = (svgContainerRef, parkingSlots, onSlotClick) => {
  // 주차장 슬롯의 ID와 상태를 기반으로 스타일링 데이터를 계산 (Memoization)
  const slotStyles = useMemo(() => {
    if (!Array.isArray(parkingSlots)) return [];

    return parkingSlots.map((slot) => ({
      id: slot.id,
      fillColor:
        slot.status === '점유'
          ? colors.occupied // 점유 상태 색상
          : slot.status === '예약'
            ? colors.reserved // 예약 상태 색상
            : colors.unoccupied, // 비점유 상태 색상
    }));
  }, [parkingSlots]);

  useEffect(() => {
    // 확인: 주어진 SVG 컨테이너와 주차 슬롯 데이터가 유효한지
    if (svgContainerRef.current && slotStyles.length > 0) {
      // 주차장 지도를 포함하는 <svg> 요소 가져오기
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        // 각 주차 슬롯 데이터에 대해 스타일 업데이트 수행
        slotStyles.forEach(({ id, fillColor }) => {
          // 특정 슬롯을 식별할 수 있는 <g> 요소 찾기
          const group = svgElement.querySelector(`#ParkingSlot${id}`);

          if (group) {
            // <g> 요소 내부의 모든 <path> 요소에 스타일 적용
            const paths = group.querySelectorAll('path');
            paths.forEach((path) => {
              // 기존 스타일에서 'fill' 속성을 제거하고 새로운 색상 추가
              const currentStyle = path.getAttribute('style') || '';
              const updatedStyle = currentStyle
                .split(';')
                .filter((style) => !style.startsWith('fill:')) // 기존 fill 속성 제거
                .concat(`fill: ${fillColor}`) // 새로운 fill 속성 추가
                .join(';');
              path.setAttribute('style', updatedStyle);
            });

            // <g> 요소에 커서 스타일 추가 (pointer)
            const groupStyle = group.getAttribute('style') || '';
            const updatedGroupStyle = groupStyle
              .split(';')
              .filter((style) => !style.startsWith('cursor:')) // 기존 cursor 제거
              .concat('cursor: pointer') // 새로운 커서 스타일 추가
              .join(';');
            group.setAttribute('style', updatedGroupStyle);

            // 클릭 이벤트 추가
            const handleClick = () => {
              const clickedSlot = parkingSlots.find((slot) => slot.id === id);
              if (clickedSlot && typeof onSlotClick === 'function') {
                console.log(clickedSlot); // DEBUG: 클릭된 슬롯 정보 출력
                onSlotClick(clickedSlot);
              }
            };
            group.addEventListener('click', handleClick);

            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            return () => {
              group.removeEventListener('click', handleClick);
            };
          } else {
            // 그룹을 찾지 못한 경우 경고 로그 출력
            console.warn(`No group found for slot id: ${id}`);
          }
        });
      } else {
        console.warn('SVG element not found in the container.');
      }
    }
  }, [svgContainerRef, parkingSlots, slotStyles, onSlotClick]); // slotStyles가 변경될 때만 실행
};

export default useParkingLotMap;
