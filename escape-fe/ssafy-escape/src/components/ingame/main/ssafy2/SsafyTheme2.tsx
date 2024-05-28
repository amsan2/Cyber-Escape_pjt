import { useEffect, useRef, useState } from "react"
import { QueryClient } from "@tanstack/react-query"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import useUserStore from "@/stores/UserStore"
import useIngameStateStore from "@/stores/IngameStateStore"
import getQuiz from "@/services/ingame/getQuiz"
import Lights from "@/components/ingame/elements/ssafy2/Basics/Lights"
import BasicScene from "@/components/ingame/BasicScene"
import Player from "@/components/ingame/elements/common/Player"
import Floor from "@/components/ingame/elements/common/Floor"
import SsafyOffice from "../../elements/ssafy2/Basics/SsafyOffice"
import CountdownTimer from "../../CountdownTimer"
import MeshObjects from "../../elements/ssafy2/Basics/MeshObjects"
import Result from "../../elements/common/Result"
import Subtitle from "../../elements/common/Subtitle"
import Interactions from "../../elements/ssafy2/Basics/Interactions"
import ProblemModals from "../../elements/common/ProblemModals"
import Start from "../../elements/common/Start"

const SsafyTheme2 = ({
  isGameStart,
  setIsModelLoaded,
  progressUpdate,
  progressReset,
  roomData,
}: IngameMainProps) => {
  const timerRef = useRef<CountdownTimerHandle | null>(null)
  const [isNull, setIsNull] = useState(false)
  const { selectedThemeType } = useIngameThemeStore()
  const { isHost } = useUserStore()
  const {
    showFirstProblem,
    showSecondProblem,
    showThirdProblem,
    isSolvedFirstProblem,
    isSolvedSecondProblem,
    isSolvedThirdProblem,
    interactNum,
    result,
    subtitle,
    isGameFinished,
    setShowFirstProblem,
    setShowSecondProblem,
    setShowThirdProblem,
    setSubtitle,
    setResult,
    setIsGameFinished,
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
    queryClient.prefetchQuery({
      queryKey: ["quizList", 6],
      queryFn: () => getQuiz(6),
    })
  }, [])

  useEffect(() => {
    if (isSolvedFirstProblem && isSolvedSecondProblem && isSolvedThirdProblem) {
      setSubtitle("이 금쪽이 녀석들 도망가게 놔둘 순 없지.")
      setTimeout(() => {
        setSubtitle("꼼짝 마! 어디 못 도망가!")
        setTimeout(() => {
          setSubtitle("")
        }, 4000)
      }, 4000)
    }
  }, [isSolvedFirstProblem, isSolvedSecondProblem, isSolvedThirdProblem])

  useEffect(() => {
    // 둘 중 한 명이 경기를 끝내면
    if (roomData?.guestProgress === 4 || roomData?.hostProgress === 4) {
      // 호스트
      if (isHost) {
        if (roomData?.hostProgress === 4) {
          setResult("victory")
        } else if (roomData?.guestProgress === 4) {
          setResult("defeat")
        }
      }
      // 게스트
      else {
        if (roomData?.guestProgress === 4) {
          setResult("victory")
        } else if (roomData?.hostProgress === 4) {
          setResult("defeat")
        }
      }
      setIsGameFinished(true)
      if (progressReset) {
        progressReset()
      }

      // 게임 종료 후, 5초 뒤 게임 종료 처리 해제
      setTimeout(() => {
        setIsGameFinished(false)
      }, 5000)
    }
  }, [roomData])

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

  // 시작 시 연출
  const sequenceActions: SequenceAction[] = [
    { subtitle: "동작 그만!!" },
    { subtitle: "금쪽이들이 탈출을 시도하는 제보를 입수했다." },
    {
      subtitle: "얼른 내 업무를 마치고 강의장으로 가야 돼",
    },
    { subtitle: "PC에 뭔가 단서가 있을 것 같아." },
    {
      subtitle: "시간이 많지 않아. 서둘러",
      endAction: () => setIsNull(true),
    },
  ]

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
          {!isNull && (
            <Start
              setSubtitle={setSubtitle}
              bgmName="SsafyBgm2"
              firstSubtitle="싸늘하다. 가슴에 비수가 날아와 꽂힌다."
              sequenceActions={sequenceActions}
            />
          )}
        </>
      )}
      <Subtitle text={subtitle} />
      <ProblemModals
        showFirstProblem={showFirstProblem}
        showSecondProblem={showSecondProblem}
        showThirdProblem={showThirdProblem}
        handleFirstProblem={handleFirstProblem}
        handleSecondProblem={handleSecondProblem}
        handleThirdProblem={handleThirdProblem}
        timePenalty={timePenalty}
        setSubtitle={setSubtitle}
        role="pro"
      />
      {isGameFinished && (
        <Result
          type={result}
          themeIdx={6}
          selectedThemeType={selectedThemeType}
        />
      )}
      <BasicScene interactNum={interactNum} mouseSpeed={0.5}>
        <MeshObjects />
        <Lights />
        <Player position={[0, 7, 0]} speed={30} args={[0, 0, 0]} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, -0.5, 0]}
        />
        <Interactions
          handleFirstProblem={handleFirstProblem}
          handleSecondProblem={handleSecondProblem}
          handleThirdProblem={handleThirdProblem}
          progressUpdate={progressUpdate}
        />
        <SsafyOffice onLoaded={setIsModelLoaded} />
      </BasicScene>
    </>
  )
}

export default SsafyTheme2
