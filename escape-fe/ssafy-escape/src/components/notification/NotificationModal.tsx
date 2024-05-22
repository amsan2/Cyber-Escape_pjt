import MainModal from "../common/MainModal"
import InvitedList from "./InvitedList"

// 받은 초대 목록을 확인할 수 있는 모달
const NotificationModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <MainModal text="초대 요청" isOpen={isOpen} onClose={onClose}>
      <InvitedList />
    </MainModal>
  )
}

export default NotificationModal
