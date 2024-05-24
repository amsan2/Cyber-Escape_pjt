import CustomAlert from "@/components/common/CustomAlert"
import ALERT_MESSAGES from "@/constants/alertMessages"

interface HintModalHandlerProps {
  isHintModalOpen: boolean
  hint: number
  openHint: boolean
  setHint: (hint: number) => void
  setOpenHint: (open: boolean) => void
  setIsHintModalOpen: (open: boolean) => void
  timePenalty: () => void
  onClose: () => void
}

const handleModal = ({
  isHintModalOpen,
  hint,
  openHint,
  setHint,
  setOpenHint,
  setIsHintModalOpen,
  timePenalty,
}: HintModalHandlerProps) => {
  if (isHintModalOpen) {
    setIsHintModalOpen(false)
  } else if (hint === 1) {
    setHint(0)
    setOpenHint(true)
    setIsHintModalOpen(true)
    timePenalty()
  } else if (hint === 0 && openHint) {
    setIsHintModalOpen(true)
  } else if (hint === 0) {
    CustomAlert({ title: ALERT_MESSAGES.ROOM.GUEST_LEFT })
  }
}

export default handleModal
