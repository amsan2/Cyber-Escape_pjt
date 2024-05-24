import { useEffect, useRef, useState } from "react"
import { QueryClient } from "@tanstack/react-query"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import useIngameStateStore from "@/stores/IngameStateStore"
import getQuiz from "@/services/ingame/getQuiz"
import CountdownTimer from "../../CountdownTimer"
import HangedDoll from "../../elements/horror/horror1/Basics/HangedDoll"
import Lights from "../../elements/horror/horror1/Basics/Lights"
import BasicScene from "../../BasicScene"
import Player from "../../elements/common/Player"
import MeshObjects from "../../elements/horror/horror1/Basics/MeshObjects"
import Floor from "../../elements/common/Floor"
import Wall from "../../elements/horror/horror1/Basics/Wall"
import Start from "../../elements/horror/horror1/Basics/Start"
import Result from "../../elements/common/Result"
import ProblemModals from "../../elements/horror/common/ProblemModals"
import Interactions from "../../elements/horror/horror1/Basics/Interactions"
import Productions from "../../elements/horror/horror1/Basics/Productions"
import BloodPool from "../../elements/horror/horror1/Basics/BloodPool"
import Art from "../../elements/horror/horror1/Basics/Art"
import Portrait from "../../elements/horror/horror1/Basics/Portrait"
import Blood from "../../elements/horror/common/Blood"

/* 
<공포 연출>

패널티 홀수개(1,3,5,7)마다 랜덤 효과음
패널티 2개 -> 빨간 글씨 출력
패널티 4개 -> 귀신 등장
패널티 6개 -> 남자 비명소리 
2분 경과 -> 패널티+1, 그림 및 초상화 변화
5분 경과 -> 문 쾅쾅 효과음, 초상화 변화

*/

// 실험체의 방(싱글)
const HorrorTheme = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [isFlowerClicked, setIsFlowerClicked] = useState<boolean>(false)
  const [isTwoMinLater, setIsTwoMinLater] = useState<boolean>(false)
  const [isFiveMinLater, setIsFiveMinLater] = useState<boolean>(false)
  const [ghostIndex, setGhostIndex] = useState(0)
  const { solved } = useIngameQuizStore()

  const {
    penalty,
    showFirstProblem,
    showSecondProblem,
    showThirdProblem,
    interactNum,
    result,
    clearTime,
    isGameFinished,
    setPenalty,
    setShowFirstProblem,
    setShowSecondProblem,
    setShowThirdProblem,
    setSubtitle,
    setResult,
    setIsGameFinished,
  } = useIngameStateStore()

  const timerRef = useRef<CountdownTimerHandle | null>(null)

  // 시간 깎는 패널티 함수
  const timePenalty = () => {
    if (timerRef.current) {
      timerRef.current.applyPenalty()
    }
  }

  // 시간 끝났을 시 이벤트 함수
  const handleTimeOut = () => {
    setResult("timeOut")
    setIsGameFinished(true)
  }

  const queryClient = new QueryClient()

  useEffect(() => {
    // 퀴즈 데이터 불러오기
    queryClient.prefetchQuery({
      queryKey: ["quizList", 2],
      queryFn: () => getQuiz(2),
    })

    // 귀신 사진 출력에 쓸 랜덤 인덱스 추출
    const randomIndex = Math.floor(Math.random() * 10) + 1
    setGhostIndex(randomIndex)

    // 2분 경과 시
    const twoMintimer = setTimeout(() => {
      setPenalty(penalty + 1)
      setIsTwoMinLater(true)
    }, 60000 * 2)

    // 5분 경과 시
    const fiveMintimer = setTimeout(() => {
      setIsFiveMinLater(true)
    }, 60000 * 5)

    return () => {
      clearTimeout(twoMintimer), clearTimeout(fiveMintimer)
    }
  }, [])

  // 첫 번째 문제 모달
  const handleFirstProblem = () => {
    if (solved === 0) {
      setShowFirstProblem(!showFirstProblem)
    }
  }

  // 두 번째 문제 모달
  const handleSecondProblem = () => {
    if (solved === 1) {
      setShowSecondProblem(!showSecondProblem)
    }
  }

  // 세 번째 문제 모달
  const handleThirdProblem = () => {
    if (solved === 2) {
      setShowThirdProblem(!showThirdProblem)
    }
  }

  return (
    <>
      {isGameStart && (
        <>
          {!isGameFinished && (
            <CountdownTimer
              color={"white"}
              ref={timerRef}
              onTimeOut={handleTimeOut}
              minutes={8}
            />
          )}
          <Start setSubtitle={setSubtitle} />
        </>
      )}
      <Productions isFiveMinLater={isFiveMinLater} ghostIndex={ghostIndex} />
      {isGameFinished && (
        <Result
          type={result}
          themeIdx={1}
          selectedThemeType={"single"}
          clearTime={clearTime}
        />
      )}
      <ProblemModals
        showFirstProblem={showFirstProblem}
        showSecondProblem={showSecondProblem}
        showThirdProblem={showThirdProblem}
        handleFirstProblem={handleFirstProblem}
        handleSecondProblem={handleSecondProblem}
        handleThirdProblem={handleThirdProblem}
        penalty={penalty}
        setPenalty={setPenalty}
        timePenalty={timePenalty}
        setSubtitle={setSubtitle}
      />
      <BasicScene interactNum={interactNum} mouseSpeed={0.5}>
        <Lights penalty={penalty} solved={solved} />
        <Player position={[3, 50, 0]} speed={70} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, -0.5, 0]}
        />
        <MeshObjects />
        <Wall />
        <HangedDoll />
        <BloodPool solved={solved} isFlowerClicked={isFlowerClicked} />
        <Art isTwoMinLater={isTwoMinLater} />
        <Portrait
          isTwoMinLater={isTwoMinLater}
          isFiveMinLater={isFiveMinLater}
        />
        <Blood penalty={penalty} role="experiment" />
        <Interactions
          isTwoMinLater={isTwoMinLater}
          isFiveMinLater={isFiveMinLater}
          isFlowerClicked={isFlowerClicked}
          setIsFlowerClicked={setIsFlowerClicked}
          setIsModelLoaded={setIsModelLoaded}
          handleFirstProblem={handleFirstProblem}
          handleSecondProblem={handleSecondProblem}
          handleThirdProblem={handleThirdProblem}
        />
      </BasicScene>
    </>
  )
}
export default HorrorTheme
