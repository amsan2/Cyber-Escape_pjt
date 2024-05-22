// HH:MM:SS -> M분 S초로 바꾸어 줌

const FormatTime = (time: string) => {
  const parts = time.split(":")

  let minutes = parseInt(parts[1], 10) // parts[1] -> M
  let seconds = parseInt(parts[2], 10) // parts[2] -> S

  return `${minutes}분 ${seconds}초`
}
export default FormatTime
