/**
 * 전역 포탈 컴포넌트
 * : 전역적으로 사용되는 모달, 팝업 등을 관리하는 컴포넌트
 * @returns {JSX.Element} - 전역 포탈 요소
 */
import { createContext, useState } from 'react';

export const GlobalPortalContext = createContext(null);

/**
 * 전역 포탈 프로바이더
 *  : Context 생성 및 전역 포탈 컨테이너 생성
 * @param {React.ReactNode} children - 자식 요소
 * @returns {JSX.Element} - 전역 포탈 프로바이더 요소
 */
export function GlobalPortalProvider({ children }) {
  const [portalContainer, setPortalContainer] = useState(null);

  return (
    <GlobalPortalContext.Provider value={portalContainer}>
      {children}
      <div
        id="portal-container"
        ref={(el) => {
          if (portalContainer === null && !!el) {
            setPortalContainer(el);
          }
        }}
      />
    </GlobalPortalContext.Provider>
  );
}
