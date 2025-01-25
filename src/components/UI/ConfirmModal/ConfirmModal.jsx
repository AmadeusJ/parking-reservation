/**
 * 확인 모달 컴포넌트
 *
 * @param {boolean} open - 모달 열기 여부
 * @param {function} onClose - 모달 닫기 함수
 * @param {function} onConfirm - 확인 버튼 클릭 함수
 * @param {function} onCancel - 취소 버튼 클릭 함수
 * @param {boolean} [showCancelButton=true] - 취소 버튼 표시 여부
 * @param {string} [cancelButtonText='아니요'] - 취소 버튼 텍스트
 * @param {string} [confirmButtonText='네'] - 확인 버튼 텍스트
 * @param {string} [description='모달 내용을 입력해주세요.'] - 모달 내용
 * @param {string} [subDescription='주의사항을 입력해주세요.'] - 모달 주의사항
 * @param {boolean} [autoClose=false] - 모달 자동 닫기 여부
 * @param {number} [autoCloseTime=3000] - 모달 자동 닫기 시간 (ms)
 * @returns {JSX.Element} - 확인 모달 요소
 */
import { PortalConsumer } from '@/components/Module/GlobalPortal';
import { Button } from '@/components/UI/Button';
import { colors } from '@/constants/colors';

const ConfirmModal = ({
  open,
  onConfirm,
  onCancel,
  showCancelButton = true,
  cancelButtonText = '아니요',
  confirmButtonText = '네',
  description = '모달 내용을 입력해주세요.',
  subDescription = '',
  // autoClose = false,
  // autoCloseTime = 3000,
}) => {
  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!open) return null;

  return (
    <PortalConsumer>
      {/* 모달 backdrop */}
      <div
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* 모달 내용 */}
        <div
          css={{
            width: '500px',
            height: '300px',
            backgroundColor: colors.white,
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {description}

          {/* 모달 주의사항 */}
          <div
            css={{
              color: colors.gray,
            }}
          >
            {subDescription}
          </div>

          {/* 버튼 컨테이너 */}
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {/* 취소 버튼 - 취소 버튼 props 에 따라 표시 여부 결정 */}
            {showCancelButton && (
              <Button width="200px" btnColor="secondary" onClick={onCancel}>
                {cancelButtonText}
              </Button>
            )}
            {/* 확인 버튼 */}
            <Button width="200px" onClick={onConfirm}>
              {confirmButtonText}
            </Button>
          </div>
        </div>
      </div>
    </PortalConsumer>
  );
};

export default ConfirmModal;
