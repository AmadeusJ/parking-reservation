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

// LiveStorage로 주차 데이터 저장
const parkingSlots = new LiveStorage('parking-slots', initialParkingSlots);
const userReservations = new LiveStorage('user-reservations', []);
const parkingLotName = '해오름'; // 고정값

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
  http.post('/api/parking-reservation/create', async ({ json }) => {
    const { parkingSlotId, userId } = await json();

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
      userId,
    });
    userReservations.update(() => reservations);

    return HttpResponse.json(
      { result: true, message: '주차장 예약 성공' },
      { status: 200 }
    );
  }),

  // 주차장 예약 취소 API
  http.delete('/api/parking-reservation/cancel', async ({ json }) => {
    const { parkingSlotId } = await json();

    // 공통 검증
    const error = validateParkingSlotId(parkingSlotId);
    if (error) {
      return HttpResponse.json(
        { result: false, message: error },
        { status: 400 }
      );
    }

    // 상태 변경 처리
    const slots = parkingSlots.getValue(); // 동기적으로 데이터 가져오기
    const slot = slots.find((slot) => slot.id === parkingSlotId);
    if (slot.status === '비점유') {
      return HttpResponse.json(
        { result: false, message: '이미 비점유 상태입니다.' },
        { status: 400 }
      );
    }
    slot.status = '비점유';
    slot.lastUpdated = new Date().toISOString();
    parkingSlots.update((prevSlots) =>
      prevSlots.map((s) => (s.id === slot.id ? slot : s))
    );

    return HttpResponse.json(
      { result: true, message: '주차장 예약 취소 성공' },
      { status: 200 }
    );
  }),

  // 주차장 예약 변경 API
  http.put('/api/parking-reservation/change', async ({ json }) => {
    const { preParkingSlotId, newParkingSlotId } = await json();

    // 공통 검증
    const error1 = validateParkingSlotId(preParkingSlotId);
    const error2 = validateParkingSlotId(newParkingSlotId);
    if (error1 || error2) {
      return HttpResponse.json(
        { result: false, message: error1 || error2 },
        { status: 400 }
      );
    }

    // 상태 변경 처리
    const slots = parkingSlots.getValue(); // 동기적으로 데이터 가져오기
    const preSlot = slots.find((slot) => slot.id === preParkingSlotId);
    const newSlot = slots.find((slot) => slot.id === newParkingSlotId);

    if (preSlot.status !== '예약') {
      return HttpResponse.json(
        { result: false, message: '현재 주차장이 예약 상태가 아닙니다.' },
        { status: 400 }
      );
    }
    if (newSlot.status !== '비점유') {
      return HttpResponse.json(
        { result: false, message: '새 주차장이 비점유 상태가 아닙니다.' },
        { status: 400 }
      );
    }

    // 예약 변경 처리
    preSlot.status = '비점유';
    newSlot.status = '예약';
    preSlot.lastUpdated = new Date().toISOString();
    newSlot.lastUpdated = new Date().toISOString();
    parkingSlots.update((prevSlots) =>
      prevSlots.map((s) => {
        if (s.id === preSlot.id) return preSlot;
        if (s.id === newSlot.id) return newSlot;
        return s;
      })
    );

    return HttpResponse.json(
      { result: true, message: '주차장 예약 변경 성공' },
      { status: 200 }
    );
  }),

  // 나의 주차내역 조회 API
  http.get('/api/my-reservation/:userId', ({ params }) => {
    const userId = parseInt(params.userId, 10);
    if (!userId) {
      return HttpResponse.json(
        { result: false, message: 'userId is required' },
        { status: 400 }
      );
    }

    const reservations = userReservations
      .getValue()
      .filter((reservation) => reservation.userId === userId);

    return HttpResponse.json({ data: reservations }, { status: 200 });
  }),
];
