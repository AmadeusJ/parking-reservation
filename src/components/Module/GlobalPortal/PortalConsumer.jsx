/**
 * 전역 포탈 컨슈머
 *  : Context 사용 - 필요한 UI를 렌더링에만 집중
 * @param {React.ReactNode} children - 자식 요소
 * @returns {JSX.Element} - 전역 포탈 컨슈머 요소
 */
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { GlobalPortalContext } from './GlobalPortalProvider';

export function PortalConsumer({ children }) {
  // 포탈 컨테이너 가져오기
  const portalContainer = useContext(GlobalPortalContext);

  // 포탈 컨테이너가 없으면 렌더링하지 않음
  if (!portalContainer) return null;

  // 포탈 컨테이너가 있으면 자식 요소를 포탈 컨테이너에 렌더링
  return createPortal(children, portalContainer);
}
