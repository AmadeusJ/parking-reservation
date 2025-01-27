import { colors } from '@/constants/colors';
import { useEffect, useMemo } from 'react';

/**
 * 주차 지도 스타일링을 처리하는 커스텀 훅
 *
 * @description
 * - 주차장 상태 데이터를 기반으로 SVG 주차 지도에서 각 주차 슬롯의 스타일을 업데이트합니다.
 * - 특정 슬롯 상태에 따라 색상을 설정 (점유, 예약, 비점유 상태).
 * - 슬롯 그룹에 클릭 이벤트를 추가하여 상위로 콜백 전달.
 * - 특정 슬롯 타입(노약자, 장애인 등)에 따라 적합한 아이콘을 추가로 표시합니다.
 *
 * @param {React.MutableRefObject<null>} svgContainerRef - 주차 지도 컨테이너의 ref
 * @param {Array} parkingSlots - 주차장 상태 데이터 (id, status, type 포함)
 * @param {Function} onSlotClick - 슬롯 클릭 시 호출되는 콜백 함수
 */
export default function useParkingLotMapHandler(
  svgContainerRef,
  parkingSlots,
  onSlotClick
) {
  // 슬롯 스타일 데이터를 메모이제이션으로 계산하여 성능 최적화
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
      type: slot.type, // 슬롯 타입 추가 (노약자, 장애인, 전기차, 여성 등)
    }));
  }, [parkingSlots]);

  // 슬롯 타입별 아이콘 경로 매핑
  const typeIcons = {
    노약자: '/icons/elderly.svg',
    장애인: '/icons/disabled.svg',
    전기차: '/icons/ev.svg',
    여성: '/icons/female.svg',
  };

  useEffect(() => {
    // SVG 컨테이너와 슬롯 스타일 데이터가 유효한지 확인
    if (svgContainerRef.current && slotStyles.length > 0) {
      // SVG 요소 가져오기
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const eventListeners = [];
        // 각 슬롯 데이터를 기반으로 스타일 및 이벤트 적용
        slotStyles.forEach(({ id, fillColor, type }) => {
          // 슬롯을 식별할 수 있는 <g> 요소 찾기
          const group = svgElement.querySelector(`#ParkingSlot${id}`);

          if (group) {
            // 슬롯의 상태에 따른 색상 설정
            const paths = group.querySelectorAll('path');
            paths.forEach((path) => {
              const currentStyle = path.getAttribute('style') || '';
              const updatedStyle = currentStyle
                .split(';')
                .filter((style) => !style.startsWith('fill:')) // 기존 fill 속성 제거
                .concat(`fill: ${fillColor}`) // 새로운 fill 속성 추가
                .join(';');
              path.setAttribute('style', updatedStyle); // 스타일 적용
            });

            // 슬롯 그룹에 커서 스타일 추가
            const groupStyle = group.getAttribute('style') || '';
            const updatedGroupStyle = groupStyle
              .split(';')
              .filter((style) => !style.startsWith('cursor:')) // 기존 cursor 제거
              .concat('cursor: pointer') // 새로운 커서 스타일 추가
              .join(';');
            group.setAttribute('style', updatedGroupStyle);

            // 슬롯 클릭 이벤트 핸들러
            const handleClick = () => {
              const clickedSlot = parkingSlots.find((slot) => slot.id === id);
              if (clickedSlot && typeof onSlotClick === 'function') {
                onSlotClick(clickedSlot); // 상위 컴포넌트로 클릭된 슬롯 정보 전달
              }
            };
            group.addEventListener('click', handleClick);
            eventListeners.push({ group, handleClick });

            // 슬롯 타입별 아이콘 추가
            if (typeIcons && typeIcons[type]) {
              const existingImage = group.querySelector('image');
              if (!existingImage) {
                // 아이콘 <image> 요소 생성
                const imageElement = document.createElementNS(
                  'http://www.w3.org/2000/svg',
                  'image'
                );
                imageElement.setAttribute('href', typeIcons[type]); // 아이콘 이미지 경로 설정
                imageElement.setAttribute('width', '90'); // 아이콘 너비
                imageElement.setAttribute('height', '90'); // 아이콘 높이

                // 아이콘의 위치 설정
                const groupBBox = group.getBBox(); // 그룹의 경계 박스 정보 가져오기
                const imageX = groupBBox.x + groupBBox.width / 2 - 45; // 아이콘을 그룹 중심에 배치
                const imageY = groupBBox.y + 60; // Y축은 그룹 중심 아래쪽으로 약간 이동
                imageElement.setAttribute('x', imageX);
                imageElement.setAttribute('y', imageY);

                group.appendChild(imageElement); // 그룹에 아이콘 추가
              }
            }
          } else {
            // <g> 요소를 찾을 수 없는 경우 경고 메시지 출력
            console.warn(`No group found for slot id: ${id}`);
          }
        });
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
          eventListeners.forEach(({ group, handleClick }) =>
            group.removeEventListener('click', handleClick)
          );
        };
      } else {
        // SVG 요소를 찾을 수 없는 경우 경고 메시지 출력
        console.warn('SVG element not found in the container.');
      }
    }
  }, [svgContainerRef, slotStyles]); // 의존성 배열
}
