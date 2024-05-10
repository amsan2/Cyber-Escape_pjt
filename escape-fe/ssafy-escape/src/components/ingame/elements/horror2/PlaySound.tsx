import { useEffect } from "react"

// 패널티에 따른 효과음 재생
const PlaySound = ({ penalty }: PlaySoundProps) => {
  useEffect(() => {
    if (penalty === 1) {
      const audio = new Audio("sound/pounding-on-door-44023.mp3")
      audio.play()
    } else if (penalty === 2) {
      const audio = new Audio("sound/trying-to-open-a-locked-door.mp3")
      audio.play()
    }
  }, [penalty])
  return null
}

export default PlaySound
