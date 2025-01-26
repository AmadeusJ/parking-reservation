import { LiveStorage } from '@mswjs/storage';
import { http, HttpResponse } from 'msw';

// 초기 데이터
const initialParkingSlots = [
  {
    id: 1,
    type: '여성',
    status: '점유',
    lastUpdated: '2025-01-01T17:55:13+09:00',
  },
  {
    id: 2,
    type: '장애인',
    status: '비점유',
    lastUpdated: '2025-01-01T17:55:13+09:00',
  },
  {
    id: 3,
    type: '일반',
    status: '예약',
    lastUpdated: '2025-01-01T17:55:13+09:00',
  },
  {
    id: 4,
    type: '일반',
    status: '비점유',
    lastUpdated: '2025-01-01T17:55:13+09:00',
  },
  {
    id: 5,
    type: '일반',
    status: '점유',
    lastUpdated: '2025-01-01T17:55:13+09:00',
  },
  {
    id: 6,
    type: '노약자',
    status: '비점유',
    lastUpdated: '2025-01-01T17:55:13+09:00',
  },
  {
    id: 7,
    type: '전기차',
    status: '비점유',
    lastUpdated: '2025-01-01T17:55:13+09:00',
  },
  {
    id: 8,
    type: '전기차',
    status: '비점유',
    lastUpdated: '2025-01-01T17:55:13+09:00',
  },
];

// 나의 예약내역 초기 데이터
const initialUserReservations = [
  {
    id: 1,
    parkingLot: '해오름',
    parkingSlotId: 3,
    created: '2025-01-01T17:55:13+09:00',
    userId: 1,
  },
];

// LiveStorage로 주차 데이터 저장
const parkingSlots = new LiveStorage('parking-slots', initialParkingSlots);
const userReservations = new LiveStorage(
  'user-reservations',
  initialUserReservations
);
const parkingLotName = '해오름'; // 고정값

// 초기화 함수
const initializeStorages = () => {
  parkingSlots.update(() => initialParkingSlots);
  userReservations.update(() => initialUserReservations);
};

// 앱 시작 시 실행
initializeStorages();

// 공통 검증 함수
const validateParkingSlotId = (id) => {
  if (typeof id !== 'number' || id <= 0) {
    return 'parkingSlotId must be a positive integer';
  }
  const slots = parkingSlots.getValue(); // 동기적으로 데이터 가져오기
  const slotExists = slots.some((slot) => slot.id === id);
  if (!slotExists) {
    return 'Invalid parkingSlotId: Slot does not exist';
  }
  return null;
};

// 핸들러 정의
export const handlers = [
  // 주차장 예약 정보 조회 API
  http.get('/api/parking-reservation', () => {
    const slots = parkingSlots.getValue(); // 동기적으로 데이터 가져오기
    return HttpResponse.json({ parkingSlots: slots }, { status: 200 });
  }),

  // 주차장 예약 생성 API
  http.post('/api/parking-reservation/create', async ({ request }) => {
    const { parkingSlotId } = await request.json();

    // 공통 검증
    const error = validateParkingSlotId(parkingSlotId);
    if (error) {
      return HttpResponse.json(
        { result: false, message: error },
        { status: 400 }
      );
    }

    // 이미 점유된 주차장 확인
    const slots = parkingSlots.getValue(); // 동기적으로 데이터 가져오기
    const slot = slots.find((slot) => slot.id === parkingSlotId);
    if (slot.status === '점유') {
      return HttpResponse.json(
        { result: false, message: '이미 점유된 주차장입니다.' },
        { status: 400 }
      );
    }

    // 예약 상태로 변경
    slot.status = '예약';
    slot.lastUpdated = new Date().toISOString();
    parkingSlots.update((prevSlots) =>
      prevSlots.map((s) => (s.id === slot.id ? slot : s))
    );

    // 사용자 예약 내역 업데이트
    const reservations = userReservations.getValue(); // 동기적으로 데이터 가져오기
    reservations.push({
      id: reservations.length + 1,
      parkingLot: parkingLotName,
      parkingSlotId,
      created: new Date().toISOString(),
    });
    userReservations.update(() => reservations);

    return HttpResponse.json(
      { result: true, message: '주차장 예약 성공' },
      { status: 200 }
    );
  }),

  // 주차장 예약 취소 API
  http.delete('/api/parking-reservation/cancel', async ({ request }) => {
    const { parkingSlotId, userId } = await request.json();

    // 공통 검증: userId와 parkingSlotId 유효성 확인
    if (!userId || typeof userId !== 'number') {
      return HttpResponse.json(
        { result: false, message: 'Invalid or missing userId' },
        { status: 400 }
      );
    }
    const error = validateParkingSlotId(parkingSlotId);
    if (error) {
      return HttpResponse.json(
        { result: false, message: error },
        { status: 400 }
      );
    }

    // 사용자 예약 내역에서 parkingSlotId 확인
    // const reservations = userReservations.getValue();
    // const userReservation = reservations.find(
    //   (reservation) =>
    //     reservation.parkingSlotId === parkingSlotId
    //     // reservation.userId === userId && reservation.parkingSlotId === parkingSlotId
    // );
    // if (!userReservation) {
    //   return HttpResponse.json(
    //     { result: false, message: 'No reservation found for this user and slot' },
    //     { status: 404 }
    //   );
    // }

    // 상태 변경 처리
    const slots = parkingSlots.getValue();
    const slot = slots.find((slot) => slot.id === parkingSlotId);
    if (slot.status === '비점유') {
      return HttpResponse.json(
        { result: false, message: '이미 비점유 상태입니다.' },
        { status: 400 }
      );
    }

    // 슬롯 상태를 비점유로 변경
    slot.status = '비점유';
    slot.lastUpdated = new Date().toISOString();
    parkingSlots.update((prevSlots) =>
      prevSlots.map((s) => (s.id === slot.id ? slot : s))
    );

    // 사용자 예약 내역에서 해당 예약 삭제
    userReservations.update((prevReservations) =>
      prevReservations.filter(
        (reservation) => !(reservation.parkingSlotId === parkingSlotId)
        // !(reservation.userId === userId && reservation.parkingSlotId === parkingSlotId)
      )
    );

    return HttpResponse.json(
      { result: true, message: '주차장 예약 취소 성공' },
      { status: 200 }
    );
  }),

  // 나의 주차내역 조회 API
  // http.get('/api/my-reservation/:userId', ({ params }) => {
  http.get('/api/my-reservation/:userId', () => {
    // const userId = parseInt(params.userId, 10);
    // if (!userId) {
    //   return HttpResponse.json(
    //     { result: false, message: 'userId is required' },
    //     { status: 400 }
    //   );
    // }

    const reservations = userReservations.getValue();
    // .filter((reservation) => {
    //   console.log(reservation, userId);
    //   return reservation.userId === userId;
    // });

    return HttpResponse.json({ data: reservations }, { status: 200 });
  }),
];
