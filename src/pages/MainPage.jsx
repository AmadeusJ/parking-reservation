/**
 * 메인 페이지
 *
 * @returns {JSX.Element} - 메인 페이지 요소
 */
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingLotMap from '../components/Feature/ParkingLotMap'; // 주차도면 SVG 컴포넌트
import { ParkingStatistics } from '../components/Feature/ParkingStatistics';
import { ConfirmModal } from '../components/UI/ConfirmModal';
import { Spinner } from '../components/UI/Spinner';
import { Text } from '../components/UI/Text';
import { colors } from '../constants/colors';
import useParkingLotMapHandler from '../hooks/handler/useParkingLotMapHandler';
import useParkingStatisticsHandler from '../hooks/handler/useParkingStatisticsHandler';
import useSlotClickHandler from '../hooks/handler/useSlotClickHandler';
import useGetParkingLotQuery from '../hooks/query/useGetParkingLotQuery';
import getGuideMessage from '../utils/getGuideMessage';
export default function MainPage() {
  const navigate = useNavigate();

  // 주차장 상태 조회
  const {
    parkingSlots,
    isParkingSlotsPending,
    isParkingSlotsError,
    parkingSlotsError,
  } = useGetParkingLotQuery();

  // 주차장 지도 컴포넌트 참조
  const parkingLotMapRef = useRef(null);

  // 슬롯 클릭 이벤트 처리
  const {
    handleSlotClick,
    isModalOpen,
    modalContent,
    closeModal,
    handleConfirm,
  } = useSlotClickHandler(navigate);

  // 주차장 지도 스타일링
  useParkingLotMapHandler(parkingLotMapRef, parkingSlots, handleSlotClick);

  // 주차장 통계 정보 계산
  const statistics = useParkingStatisticsHandler(parkingSlots);

  // 주차장 예약 페이지 안내문구 생성
  const guideMessage = getGuideMessage(statistics);

  // 주차장 상태 조회 로딩 중일 때 스피너 표시
  if (isParkingSlotsPending) {
    return <Spinner isLoading={isParkingSlotsPending} />;
  }

  // 주차장 상태 조회 오류 발생 시 오류 메시지 표시
  if (isParkingSlotsError) {
    return <div>Error: {parkingSlotsError.message}</div>;
  }

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        marginTop: '50px',
      }}
    >
      {/* 주차장 예약 페이지 - 안내 문구 : 예약 가능 여부에 따라 문구 변경 */}
      <Text
        fontSize="35px"
        fontWeight="bold"
        color="black"
        highlight={['가능', '예약 중', '어려워요']}
      >
        {guideMessage}
      </Text>

      {/* 주차장 통계 컴포넌트 */}
      <ParkingStatistics statistics={statistics} />

      {/* 주차장 지도 컴포넌트 */}
      <ParkingLotMap
        css={{
          width: '650px',
          height: '650px',
        }}
        ref={parkingLotMapRef}
      />

      {/* 확인 모달 */}
      {isModalOpen && (
        <ConfirmModal
          open={isModalOpen}
          onCancel={closeModal}
          onConfirm={handleConfirm}
          description={
            <Text color={colors.black} fontSize="25px" fontWeight="bold">
              {modalContent.description}
            </Text>
          }
          subDescription={modalContent.subDescription}
          showCancelButton={modalContent.showCancelButton}
          confirmButtonText={modalContent.confirmButtonText}
        />
      )}
    </div>
  );
}
