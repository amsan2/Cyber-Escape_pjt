// 모달 관련 인터페이스

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

interface HintModalProps extends ModalProps {
  quizUuid: string
}