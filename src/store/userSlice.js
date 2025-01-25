/**
 * userSlice.js
 * 사용자 정보 관리
 *
 * NOTE: 현재 PoC(Proof of Concept) 범위에서만 사용
 *       : 단순히 사용자 표시 역할
 * FIXME: 추후 사용자 정보에 대한 더 정교한 상태 관리 필요
 */

import { createSlice } from '@reduxjs/toolkit';

// 초기 user 상태 정의
const initialState = {
  id: 1,
  name: '정다운',
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // 사용자 정보 업데이트
    updateUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// userSlice의 액션 생성
export const { updateUser } = userSlice.actions;

// userSlice의 리듀서 내보내기
export default userSlice.reducer;
