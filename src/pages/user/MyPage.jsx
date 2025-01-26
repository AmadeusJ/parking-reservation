/**
 * MyPage.jsx
 * 나의 예약 페이지
 */

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReservationInfo } from '../../components/Feature/ReservationInfo';
import { Button } from '../../components/UI/Button';
import { Spinner } from '../../components/UI/Spinner';
import { Text } from '../../components/UI/Text';
import { useGetMyReservationQuery } from '../../hooks/query/useGetMyReservationQuery';

export default function MyPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // 나의 예약 목록 조회
  const {
    myReservations,
    isMyReservationsPending,
    isMyReservationsError,
    myReservationsError,
  } = useGetMyReservationQuery(user.id);

  // 로딩 상태일 경우
  if (isMyReservationsPending) {
    return <Spinner isLoading={isMyReservationsPending} />;
  }

  // 오류 상태일 경우
  if (isMyReservationsError) {
    return <div>Error: {myReservationsError.message}</div>;
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
      {/* 나의 예약 목록 안내 문구 */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text fontSize="35px" fontWeight="bold">
          {`"${user.name}"님의 예약 현황을 알려드릴께요.`}
        </Text>
      </div>

      {/* 나의 예약 목록이 있을 경우 */}
      {myReservations.length > 0 &&
        myReservations.map((reservation) => (
          <ReservationInfo key={reservation.id} reservation={reservation} />
        ))}

      {/* 나의 예약 목록이 없을 경우 */}
      {myReservations.length === 0 && (
        <>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              padding: '70px',
            }}
          >
            <Text
              fontSize="25px"
              fontWeight="bold"
              highlight={[
                '예약하신 내역이 없어요.',
                '예약 화면에서 예약을 진행해주세요.',
              ]}
            >
              {`예약하신 내역이 없어요.<br/>예약 화면에서 예약을 진행해주세요.`}
            </Text>
          </div>
          <div>
            <Button onClick={() => navigate('/')}>예약하기</Button>
          </div>
        </>
      )}
    </div>
  );
}
