import { GlobalPortalProvider } from '@/components/GlobalPortal';
import ConfirmModal from './ConfirmModal';

export default {
  title: 'UI/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    open: {
      control: 'boolean',
      description: '모달 열기 여부',
      defaultValue: { summary: 'false' },
    },
    onClose: {
      control: 'function',
      description: '모달 닫기 함수',
      defaultValue: { summary: '() => {}' },
    },
    onConfirm: {
      control: 'function',
      description: '확인 버튼 클릭 함수',
      defaultValue: { summary: '() => {}' },
    },
    onCancel: {
      control: 'function',
      description: '취소 버튼 클릭 함수',
      defaultValue: { summary: '() => {}' },
    },
    showCancelButton: {
      control: 'boolean',
      description: '취소 버튼 표시 여부',
      defaultValue: { summary: 'true' },
    },
  },
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
    onCancel: () => {},
    showCancelButton: true,
  },
};

export const Default = () => {
  return (
    <GlobalPortalProvider>
      <ConfirmModal
        open={true}
        onClose={() => {}}
        onConfirm={() => {}}
        onCancel={() => {}}
        showCancelButton={true}
      />
    </GlobalPortalProvider>
  );
};

export const NoCancelButton = () => {
  return (
    <GlobalPortalProvider>
      <ConfirmModal
        open={true}
        onClose={() => {}}
        onConfirm={() => {}}
        onCancel={() => {}}
        showCancelButton={false}
      />
    </GlobalPortalProvider>
  );
};
