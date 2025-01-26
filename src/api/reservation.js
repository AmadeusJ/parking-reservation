import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw new Error(
      error.response?.data?.message || '데이터를 불러오는데 실패했습니다.'
    );
  }
);

// IMPORTANT: QueryClient 인스턴스 생성
export const queryClient = new QueryClient();

// 주차장 예약 관련 API 함수 정의
const reservationApi = {
  /**
   * 주차장 예약 정보 조회
   * @param {AbortSignal} signal 취소 가능한 요청 신호
   * @returns {Promise} 주차장 상태 데이터
   */
  getParkingSlots: async ({ signal }) => {
    try {
      const response = await apiClient.get('/parking-reservation', { signal });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || '데이터를 불러오는데 실패했습니다.'
      );
    }
  },

  /**
   * 주차장 예약 생성
   * @param {number} parkingSlotId 예약할 주차장의 ID
   * @returns {Promise} 예약 생성 결과
   */
  createReservation: async (parkingSlotId) => {
    try {
      const response = await apiClient.post('/parking-reservation/create', {
        parkingSlotId,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || '예약 생성에 실패했습니다.'
      );
    }
  },

  /**
   * 주차장 예약 취소
   * @param {number} parkingSlotId 취소할 주차장의 ID
   * @returns {Promise} 예약 취소 결과
   */
  cancelReservation: async (parkingSlotId) => {
    try {
      const response = await apiClient.delete('/parking-reservation/cancel', {
        data: { parkingSlotId },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || '예약 취소에 실패했습니다.'
      );
    }
  },

  /**
   * 주차장 예약 변경
   * @param {number} preParkingSlotId 현재 예약된 주차장의 ID
   * @param {number} newParkingSlotId 변경할 주차장의 ID
   * @returns {Promise} 예약 변경 결과
   */
  changeReservation: async (preParkingSlotId, newParkingSlotId) => {
    try {
      const response = await apiClient.put('/parking-reservation/change', {
        preParkingSlotId,
        newParkingSlotId,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || '예약 변경에 실패했습니다.'
      );
    }
  },

  /**
   * 나의 주차내역 조회
   * @param {number} userId 조회할 사용자의 ID
   * @param {AbortSignal} signal 취소 가능한 요청 신호
   * @returns {Promise} 주차내역 데이터
   */
  getMyReservation: async ({ signal, userId }) => {
    try {
      const response = await apiClient.get(`/my-reservation/${userId}`, {
        signal,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || '예약 조회에 실패했습니다.'
      );
    }
  },
};

export default reservationApi;
