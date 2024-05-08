import { useEffect } from "react"

interface PlaySoundProps {
  soundNum: number
  fanalty: number
}
// 효과음 재생
const PlaySound = ({ soundNum, fanalty }: PlaySoundProps) => {
  useEffect(() => {
    if (soundNum === 1) {
      const audio = new Audio("sound/woman_scream.mp3")
      audio.play()
    } else if (soundNum === 2) {
      const audio = new Audio("sound/door_bang.mp3")
      audio.play()
    }

    if (fanalty === 1) {
      const audio = new Audio("sound/pounding-on-door-44023.mp3")
      audio.play()
    } else if (fanalty === 2) {
      const audio = new Audio("sound/trying-to-open-a-locked-door.mp3")
      audio.play()
    }
  }, [soundNum, fanalty])
  return null
}

export default PlaySound
