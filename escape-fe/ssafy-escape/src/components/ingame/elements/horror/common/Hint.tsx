import styled from "styled-components"
import Image from "next/image"
import HintModal from "../../common/HintModal"
import CustomAlert from "@/components/common/CustomAlert"
import ALERT_MESSAGES from "@/constants/alertMessages"

const Hint = ({
  isHintModalOpen,
  setIsHintModalOpen,
  hint,
  setHint,
  openHint,
  setOpenHint,
  timePenalty,
  quizData,
  problemIndex,
  left,
  top,
  bottom,
}: HintProps) => {
  const handleModal = () => {
    if (isHintModalOpen === true) {
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

  return (
    <>
      <HintIconBox left={left} top={top} bottom={bottom} onClick={handleModal}>
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/hint.png"}
          alt="힌트 아이콘"
          width={35}
          height={35}
        />
        <div>힌트보기</div>
      </HintIconBox>
      <HintModal
        isOpen={isHintModalOpen}
        onClose={handleModal}
        quizUuid={quizData[problemIndex].quizUuid}
      />
    </>
  )
}

export default Hint

const HintIconBox = styled.div<HintIconBoxProps>`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  z-index: 10;
  font-size: 16px;
`
