import { useRef } from "react"
import postUpdateRank from "@/services/main/ranking/postUpdateRank"
import SecondToTime from "@/utils/SecondToTime"

// CountdownTimer의 함수, state를 가져옴

const SingleVictory = async ({
  userUuid,
  selectedTheme,
  setClearTime,
  setResult,
  setIsGameFinished,
}: SingleVictoryProps) => {
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  if (timerRef.current) {
    const currentTime = timerRef.current.getTime()
    const clearSeconds = 480 - (currentTime.minutes * 60 + currentTime.seconds)
    setClearTime(SecondToTime(clearSeconds))
    await postUpdateRank(
      SecondToTime(clearSeconds),
      userUuid as string,
      selectedTheme,
    )
  }
  setResult("victory")
  setIsGameFinished(true)
}

export default SingleVictory
