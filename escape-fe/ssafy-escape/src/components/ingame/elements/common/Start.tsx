import { useEffect, useState } from "react"
import styled from "styled-components"
import setStartSubtitle from "@/utils/setStartSubtitle"

// 시작 연출
const Start = ({
  setSubtitle,
  bgmName,
  firstSubtitle,
  sequenceActions,
}: StartProps) => {
  const [sequence, setSequence] = useState(0)
  const [showInstruction, setShowInstruction] = useState(true)
  const [containerOpacity, setContainerOpacity] = useState(1)

  // 클릭 시 시작 연출
  const handleStartClick = () => {
    firstProduction()
    setShowInstruction(false)
  }

  // 첫 시작 연출
  const firstProduction = () => {
    const bgm = new Audio(
      process.env.NEXT_PUBLIC_IMAGE_URL + `/music/${bgmName}.mp3`,
    )
    bgm.play()
    bgm.loop = true
    setSubtitle(firstSubtitle)
    setTimeout(() => {
      setSequence((n) => n + 1)
      setContainerOpacity(0)
      setSubtitle("")
    }, 4000)
  }

  useEffect(() => {
    if (sequence >= 1 && sequence <= sequenceActions.length) {
      const { subtitle, delay, action, endAction } =
        sequenceActions[sequence - 1]
      action?.()
      setStartSubtitle({
        setSubtitle,
        setSequence,
        subtitle,
        delay,
      })
      endAction?.()
    }
  }, [sequence])

  return (
    <Container opacity={containerOpacity} onClick={handleStartClick}>
      {showInstruction && (
        <Instructions>
          <p>Click to start</p>
        </Instructions>
      )}
    </Container>
  )
}

export default Start

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: Arial, sans-serif;
  z-index: 10;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s ease;
`

const Instructions = styled.div`
  text-align: center;
`
