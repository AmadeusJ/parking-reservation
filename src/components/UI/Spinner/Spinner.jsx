/**
 * 스피너 컴포넌트
 *
 * @param {boolean} isLoading - 로딩 상태
 * @returns {JSX.Element} - 스피너 요소
 */

import spinner from '@/assets/bouncing-circles.svg';
import { PortalConsumer } from '@/components/Module/GlobalPortal';

const Spinner = ({ isLoading = false }) => {
  // 로딩 상태가 아니면 렌더링하지 않음
  if (!isLoading) return null;

  return (
    <PortalConsumer>
      <div
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={spinner}
          alt="loading"
          css={{ width: '100px', height: '100px' }}
        />
      </div>
    </PortalConsumer>
  );
};

export default Spinner;
