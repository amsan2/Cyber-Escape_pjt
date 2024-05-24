import { useEffect } from "react"

// 효과음 재생
const PlaySound = ({ audioFileName, play }: PlaySoundProps) => {
  useEffect(() => {
    if (play) {
      const audio = new Audio(
        `${process.env.NEXT_PUBLIC_IMAGE_URL}/sound/${audioFileName}.mp3`,
      )
      audio.play()
    }
  }, [play, audioFileName])

  return null
}

export default PlaySound
