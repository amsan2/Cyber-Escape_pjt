"use client"

import styled from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Modal from "@mui/material/Modal"
import useModalStore from "@/stores/ModalStore"
import Button from "./Button"

const MainModal = ({
  children,
  width,
  height,
  text,
  isOpen,
  onClose,
  isFriendModal,
}: MainModalProps) => {
  const {
    isRequestModalOpen,
    isDeleteMode,
    setIsRequestModalOpen,
    setIsDeleteMode,
  } = useModalStore()

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{ zIndex: 1020 }}
    >
      <ModalBox $width={width} $height={height}>
        <Header>
          <MainText>{text}</MainText>
          <IconBox onClick={onClose}>
            <CloseIcon sx={{ fontSize: 40 }} />
          </IconBox>
        </Header>

        <Divider />

        <ContentArea>{children}</ContentArea>

        {isFriendModal && (
          <ButtonBox>
            <Button
              text="친구 추가"
              theme="success"
              width="auto"
              onClick={() => setIsRequestModalOpen(!isRequestModalOpen)}
            />
            <Button
              text="친구 삭제"
              theme="fail"
              width="auto"
              onClick={() => setIsDeleteMode(!isDeleteMode)}
            />
          </ButtonBox>
        )}
      </ModalBox>
    </Modal>
  )
}

export default MainModal

const ModalBox = styled.div<MainModalStyleProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.$width || "35vw"};
  height: ${(props) => props.$height || "60vh"};
  border-radius: 20px;
  background-color: white;
  padding: 20px;
  overflow: hidden;
  z-index: 100;
`

const Header = styled.div`
  position: relative;
`

const MainText = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`

const IconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: -8px;
  top: -8px;
`

const Divider = styled.hr`
  margin: 10px 0;
`

const ContentArea = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 50px);

  &::-webkit-scrollbar {
    display: none;
  }
`

const ButtonBox = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`

