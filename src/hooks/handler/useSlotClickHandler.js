import { useCallback, useMemo, useState } from 'react';
/**
 * 슬롯 클릭 이벤트를 처리하는 커스텀 훅
 *
 * @param {Function} onNavigate - 다른 화면으로 이동하는 함수
 * @returns {Object} - 모달 상태 및 클릭 핸들러
 */
export default function useSlotClickHandler(onNavigate) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalContent, setModalContent] = useState({
    description: '',
    subDescription: '',
    showCancelButton: true,
    confirmButtonText: null,
  });

  const typeWarnings = useMemo(() => {
    return {
      점유: '이미 예약 중인 자리에요.<br/>다른 자리를 선택해 주세요.',
      예약: '회원님이 예약 중인 자리에요.<br/>예약을 취소 할까요?',
    };
  }, []);

  const typeSpecial = useMemo(() => {
    return {
      전기차: '전기차 충전 목적으로만 사용을 부탁드려요.',
      여성: '해당 이용 대상이 아닌 경우 자리를 양보해 주세요.',
      노약자: '해당 이용 대상이 아닌 경우 자리를 양보해 주세요.',
      장애인: '허가 없이 이용할 경우 법적 책임이 있어요.',
    };
  }, []);

  const handleSlotClick = useCallback(
    (slot) => {
      // 선택된 슬롯 정보 저장
      setSelectedSlot(slot);

      switch (slot.status) {
        // 점유 상태일 경우
        case '점유':
          setModalContent({
            description: typeWarnings['점유'],
            showCancelButton: false,
            confirmButtonText: '확인',
          });
          setIsModalOpen(true);
          break;

        // 비점유 상태일 경우
        case '비점유':
          if (typeSpecial[slot.type]) {
            setModalContent({
              description: `${slot.type}번 자리에요!<br/>예약을 진행할까요?`,
              subDescription: typeSpecial[slot.type],
              showCancelButton: true,
              confirmButtonText: '예약하기',
            });
            setIsModalOpen(true);
          } else {
            onNavigate('/reservation', {
              state: { slot: slot, action: 'reserve' },
            });
          }
          break;

        // 예약 상태일 경우
        case '예약':
          setModalContent({
            description: typeWarnings['예약'],
            showCancelButton: true,
          });
          setIsModalOpen(true);
          break;
      }
    },
    [typeWarnings, typeSpecial, onNavigate]
  );

  // 모달 닫기
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedSlot(null);
    setModalContent(null);
  }, []);

  // 확인 버튼 클릭 시 예약 처리
  const handleConfirm = useCallback(() => {
    // 비점유 상태일 경우 예약 처리
    if (selectedSlot.status === '비점유') {
      onNavigate('/reservation', {
        state: { slot: selectedSlot, action: 'reserve' },
      });
      // 예약 상태일 경우 예약 취소 처리
    } else if (selectedSlot.status === '예약') {
      onNavigate('/reservation', {
        state: { slot: selectedSlot, action: 'cancel' },
      });
      // 점유 상태일 경우 모달 닫기
    } else {
      closeModal();
    }
  }, [selectedSlot, onNavigate, closeModal]);

  return {
    handleSlotClick,
    isModalOpen,
    selectedSlot,
    modalContent,
    closeModal,
    handleConfirm,
  };
}
