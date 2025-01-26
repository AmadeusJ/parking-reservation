import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { ConfirmModal } from '../../components/UI/ConfirmModal';
import { Spinner } from '../../components/UI/Spinner';
import { Text } from '../../components/UI/Text';
import useReservationHandler from '../../hooks/useReservationHandler';
import { useReservationQuery } from '../../hooks/useReservationQuery';

export default function ReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // 선택된 주차면 데이터
  const { slot } = location.state;
  // 예약 생성 API 호출 함수
  const { createReservation } = useReservationQuery();
  // 예약 처리 로직 관리 커스텀 훅
  const { guideSentence, isConfirmed, handleReservation, isLoading } =
    useReservationHandler(createReservation);

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

  // 로딩 상태일 경우
  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
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
        <Text fontSize="35px" fontWeight="bold">
          {guideSentence ||
            `해오름 주차장의<br/>${slot.id}번 자리를 예약할께요.`}
        </Text>
      </div>

      {/* 예약 버튼 */}
      <div css={{ display: 'flex', gap: '35px', marginTop: '35px' }}>
        {/* 예약 버튼 */}
        {!isConfirmed && (
          <>
            <Button btnColor="secondary" onClick={() => navigate('/')}>
              취소하기
            </Button>
            <Button onClick={() => handleReservation(slot)}>예약하기</Button>
          </>
        )}

        {/* 확인 버튼 */}
        {isConfirmed && <Button onClick={() => navigate('/')}>확인</Button>}
      </div>
    </div>
  );
}
