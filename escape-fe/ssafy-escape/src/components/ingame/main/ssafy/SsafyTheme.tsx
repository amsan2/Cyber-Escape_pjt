import { useEffect, useRef } from "react"
import { QueryClient } from "@tanstack/react-query"
import useIngameStateStore from "@/stores/IngameStateStore"
import getQuiz from "@/services/ingame/getQuiz"
import BasicScene from "@/components/ingame/BasicScene"
import Player from "@/components/ingame/elements/common/Player"
import Floor from "@/components/ingame/elements/common/Floor"
import CountdownTimer from "../../CountdownTimer"
import MeshObjects from "../../elements/ssafy/Basics/MeshObjects"
import Result from "../../elements/common/Result"
import SsafyClassRoom from "../../elements/ssafy/Basics/SsafyClassRoom"
import Plant from "../../elements/ssafy/Basics/Plant"
import Lights from "../../elements/ssafy/Basics/Lights"
import Interactions from "../../elements/ssafy/Basics/Interactions"
import ProblemModals from "../../elements/common/ProblemModals"
import Subtitle from "../../elements/common/Subtitle"
import Start from "../../elements/ssafy/Basics/Start"

const SsafyTheme = ({
  isGameStart,
  setIsModelLoaded,
  progressUpdate,
}: IngameMainProps) => {
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  const {
    showFirstProblem,
    showSecondProblem,
    showThirdProblem,
    isSolvedFirstProblem,
    isSolvedSecondProblem,
    isSolvedThirdProblem,
    interactNum,
    result,
    clearTime,
    isGameFinished,
    subtitle,
    setIsSolvedFirstProblem,
    setIsSolvedSecondProblem,
    setIsSolvedThirdProblem,
    setShowFirstProblem,
    setShowSecondProblem,
    setShowThirdProblem,
    setSubtitle,
    setResult,
    setIsGameFinished,
    resetIngameState,
  } = useIngameStateStore()

  // 시간 깎는 패널티 함수
  const timePenalty = () => {
    if (timerRef.current) {
      timerRef.current.applyPenalty()
    }
  }

  // 퀴즈 데이터 prefetch
  const queryClient = new QueryClient()
  useEffect(() => {
    resetIngameState()
    queryClient.prefetchQuery({
      queryKey: ["quizList", 5],
      queryFn: () => getQuiz(5),
    })
  }, [])

  useEffect(() => {
    if (isSolvedFirstProblem && isSolvedSecondProblem && isSolvedThirdProblem) {
      setSubtitle("휴... 이제 자유다!!")
      setTimeout(() => {
        setSubtitle("굿바이 멀캠! 나는 한강으로 간다!")
        setTimeout(() => {
          setSubtitle("")
        }, 4000)
      }, 4000)
    }
  }, [isSolvedFirstProblem, isSolvedSecondProblem, isSolvedThirdProblem])

  // 시간이 다 됐을 경우
  const handleTimeOut = () => {
    setResult("timeOut")
    setIsGameFinished(true)
  }

  // 첫 번째 문제 모달
  const handleFirstProblem = () => {
    setShowFirstProblem(!showFirstProblem)
  }

  // 두 번째 문제 모달
  const handleSecondProblem = () => {
    setShowSecondProblem(!showSecondProblem)
  }

  // 세 번째 문제 모달
  const handleThirdProblem = () => {
    setShowThirdProblem(!showThirdProblem)
  }

  // // 시작 시 연출
  // const sequenceActions: SequenceAction[] = [
  //   { subtitle: "아 오늘 날씨도 좋은데 한강이나 가고 싶다" },
  //   { subtitle: "몰래 도망가버릴까...?" },
  //   {
  //     subtitle: "프로님 죄송합니다!!!!!",
  //   },
  //   { subtitle: "노트북에 뭔가 단서가 있을 것 같아." },
  //   {
  //     subtitle: "칠판도 좀 수상한데?",
  //     endAction: () => setIsNull(true),
  //   },
  // ]

  return (
    <>
      {isGameStart && (
        <>
          {!isGameFinished && (
            <CountdownTimer
              color={"white"}
              ref={timerRef}
              onTimeOut={handleTimeOut}
              minutes={5}
            />
          )}
          <Start setSubtitle={setSubtitle} />
        </>
      )}
      <ProblemModals
        showFirstProblem={showFirstProblem}
        showSecondProblem={showSecondProblem}
        showThirdProblem={showThirdProblem}
        handleFirstProblem={handleFirstProblem}
        handleSecondProblem={handleSecondProblem}
        handleThirdProblem={handleThirdProblem}
        setIsSolvedFirstProblem={setIsSolvedFirstProblem}
        setIsSolvedSecondProblem={setIsSolvedSecondProblem}
        setIsSolvedThirdProblem={setIsSolvedThirdProblem}
        timePenalty={timePenalty}
        setSubtitle={setSubtitle}
        role="trainee"
      />
      {isGameFinished && (
        <Result
          type={result}
          themeIdx={4}
          selectedThemeType={"single"}
          clearTime={clearTime}
        />
      )}
      <Subtitle text={subtitle} />
      <BasicScene interactNum={interactNum} mouseSpeed={0.5}>
        <MeshObjects />
        <Lights />
        <Player position={[-3, 11, 10]} speed={40} args={[0, 0, 0]} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, -0.5, 0]}
        />
        <Interactions
          timerRef={timerRef}
          handleFirstProblem={handleFirstProblem}
          handleSecondProblem={handleSecondProblem}
          handleThirdProblem={handleThirdProblem}
          progressUpdate={progressUpdate}
        />
        <Plant />
        <SsafyClassRoom onLoaded={setIsModelLoaded} />
      </BasicScene>
    </>
  )
}

export default SsafyTheme
