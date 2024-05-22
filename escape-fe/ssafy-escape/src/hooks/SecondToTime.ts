// 초를 주면 "00:MM:SS" 형태로 바꾸어 줌

const SecondToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  // padStart -> 길이가 2가 되도록 앞에 "0"을 채움
  return `00:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default SecondToTime