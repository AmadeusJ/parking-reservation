/**
 * 브라우저 환경에서 Mock Service Worker(MSW)를 설정합니다.
 * - 개발 환경에서 API 요청을 모킹(mocking)하기 위한 설정 파일입니다.
 * - 서버 요청을 가로채고, 정의된 핸들러(handlers)에 따라 가상 응답을 제공합니다.
 *
 * @file Mock Service Worker 브라우저 설정 파일
 * @see https://mswjs.io/docs/
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * setupWorker:
 * - 핸들러를 사용하여 브라우저에서 요청을 가로채는 MSW 워커를 초기화합니다.
 * - 이 워커는 개발 환경에서만 활성화됩니다.
 *
 * @returns {Object} worker - MSW 워커 인스턴스
 */
export const worker = setupWorker(...handlers);
