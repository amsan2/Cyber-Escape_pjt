import { useState, useEffect } from "react"
import Image from "next/image"
import styled from "styled-components"

// 귀신 갑툭튀
const ShowGhost = ({ penalty, index }: PenaltyProps) => {
  const [showExtraImage, setShowExtraImage] = useState<boolean>(false)

  useEffect(() => {
    if (penalty === 4) {
      const playAudio = setTimeout(() => {
        const audio = new Audio(
          process.env.NEXT_PUBLIC_IMAGE_URL + "/sound/woman_scream.mp3",
        )
        audio.play()
        const showImg = setTimeout(() => {
          setShowExtraImage(true)
          const hideImg = setTimeout(() => {
            setShowExtraImage(false)
          }, 1300)
          return () => clearTimeout(hideImg)
        }, 500)
        return () => clearTimeout(showImg)
      }, 5000)
      return () => clearTimeout(playAudio)
    }
  }, [penalty])

  return (
    showExtraImage && (
      <BlackBackground>
        <HorrorImageBox>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/image/ghost/ghost${index}.jpg`}
            alt="귀신 이미지"
            layout="fill"
            objectFit="cover"
          />
        </HorrorImageBox>
      </BlackBackground>
    )
  )
}

export default ShowGhost

const HorrorImageBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  z-index: 25;
`

const BlackBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 24;
`
