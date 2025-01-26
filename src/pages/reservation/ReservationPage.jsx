/**
 * ReservationPage.jsx
 * 예약 페이지
 */
import { useLocation, useNavigate } from 'react-router-dom';
import getActionButtons from '../../components/Module/getActionButtons';
import { ConfirmModal } from '../../components/UI/ConfirmModal';
import { Spinner } from '../../components/UI/Spinner';
import { Text } from '../../components/UI/Text';
import useReservationHandler from '../../hooks/handler/useReservationHandler';
import useCancleReservationQuery from '../../hooks/query/useCancleReservationQuery';
import useCreateReservationQuery from '../../hooks/query/useCreateReservationQuery';
import getActionMessage from '../../utils/getActionMessage';
export default function ReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // 선택된 주차면 데이터
  const { slot, action } = location.state;
  // 예약 생성 API 호출 함수
  const { createReservation } = useCreateReservationQuery();
  // 예약 처리 로직 관리 커스텀 훅
  const { resultMessage, isConfirmed, handleReservation, isLoading } =
    useReservationHandler(createReservation);
  // 예약 취소 API 호출 함수
  const {
    cancelReservation,
    isCancelingReservation,
    isCancelingReservationError,
    isCancelingReservationSuccess,
  } = useCancleReservationQuery();
  // 선택된 주차면 데이터가 없을 경우
  if (!slot) {
    return (
      <ConfirmModal
        open={true}
        onConfirm={() => navigate('/')}
        description="선택된 자리가 없어요.<br/>선택 페이지로 이동할께요."
        showCancelButton={false}
        confirmButtonText="확인"
      />
    );
  }

  // 예약 처리 관련 액션 메시지 생성
  const actionMessage = getActionMessage(action, {
    slot,
    resultMessage,
    isCancelingReservationSuccess,
    isCancelingReservationError,
  });

  // 예약 처리 관련 액션 버튼 생성
  const actionButtons = getActionButtons({
    action,
    isConfirmed,
    isCancelingReservationSuccess,
    isCancelingReservationError,
    handleReservation,
    cancelReservation,
    navigate,
    slot,
  });

  // 로딩 상태일 경우
  if (isLoading || isCancelingReservation) {
    return <Spinner isLoading={isLoading || isCancelingReservation} />;
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
      {/* 예약 페이지 안내문구 */}
      <div>
        <Text
          fontSize="35px"
          fontWeight="bold"
          highlight={['예약', '문제', '빠르게', '취소']}
        >
          {actionMessage}
        </Text>
      </div>

      {/* 예약 버튼 */}
      <div css={{ display: 'flex', gap: '35px', marginTop: '35px' }}>
        {actionButtons}
      </div>
    </div>
  );
}
