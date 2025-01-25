/**
 * 주차 지도 컴포넌트
 *
 * @returns {JSX.Element} - 주차 지도 요소
 */
import { forwardRef, memo, useRef } from 'react';
import ParkingLotSVG from '../../assets/ParkingLot.svg?react';

const ParkingLotMap = forwardRef(({ width, height, ...props }, ref) => {
  const svgContainerRef = useRef(null);

  return (
    <div ref={ref} {...props}>
      <div ref={svgContainerRef}>
        <ParkingLotSVG width={width} height={height} />
      </div>
    </div>
  );
});

ParkingLotMap.displayName = 'ParkingLotMap';

export default memo(ParkingLotMap);
