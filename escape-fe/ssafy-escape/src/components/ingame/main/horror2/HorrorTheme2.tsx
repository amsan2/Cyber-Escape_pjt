import { useEffect, useRef, useState } from "react"
import { Environment, Lightformer } from "@react-three/drei"
import { QueryClient } from "@tanstack/react-query"
import styled from "styled-components"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import useUserStore from "@/stores/UserStore"
import useIngameStateStore from "@/stores/IngameStateStore"
import getQuiz from "@/services/ingame/getQuiz"
import BasicScene from "../../BasicScene"
import Player from "../../elements/common/Player"
import MeshObjects from "../../elements/horror/horror2/Basics/MeshObjects"
import Floor from "../../elements/common/Floor"
import Blood from "../../elements/horror/common/Blood"
import HorrorRoom2 from "../../elements/horror/horror2/Basics/HorrorRoom2"
import Paper from "../../elements/horror/horror2/Basics/Paper"
import CountdownTimer from "../../CountdownTimer"
import Glasses from "../../elements/horror/horror2/Basics/Glasses"
import ScissorDoll from "../../elements/horror/horror2/Basics/ScissorDoll"
import Spider from "../../elements/horror/horror2/Basics/Spider"
import CreepyDoll from "../../elements/horror/horror2/Basics/CreepyDoll"
import VoodooDoll from "../../elements/horror/horror2/Basics/VoodooDoll"
import PlayPenaltySound from "../../elements/horror/common/PlayPenaltySound"
import Result from "../../elements/common/Result"
import Productions from "../../elements/horror/horror2/Basics/Productions"
import Start from "../../elements/common/Start"
import Interactions from "../../elements/horror/horror2/Basics/Interactions"
import ProblemModals from "../../elements/horror/common/ProblemModals"

const HorrorTheme2 = ({
  isGameStart,
  setIsModelLoaded,
  progressUpdate,
  progressReset,
  roomData,
}: IngameMainProps) => {
  const { solved, resetQuizState } = useIngameQuizStore()
  const { selectedThemeType } = useIngameThemeStore()
  const [showSpider, setShowSpider] = useState<boolean>(false)
  const [isTwoMinLater, setIsTwoMinLater] = useState<boolean>(false)
  const [isFiveMinLater, setIsFiveMinLater] = useState<boolean>(false)
  const [ghostIndex, setGhostIndex] = useState(0)
  const [environmentIntensity, setEnvironmentIntensity] = useState<number>(0.35)
  const [isNull, setIsNull] = useState(false)
  const { isHost } = useUserStore()

  const {
    penalty,
    showFirstProblem,
    showSecondProblem,
    showThirdProblem,
    interactNum,
    result,
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
    queryClient.prefetchQuery({
      queryKey: ["quizList", 3],
      queryFn: () => getQuiz(3),
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

  useEffect(() => {
    // 시간 경과에 따른 조명 연출
    if (isTwoMinLater && !isFiveMinLater) {
      setEnvironmentIntensity(0.25)
    } else if (isFiveMinLater) {
      setEnvironmentIntensity(0.2)
    }
  }, [isTwoMinLater, isFiveMinLater])

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
      if (progressReset) {
        progressReset()
      }
      setIsGameFinished(true)
      setTimeout(() => {
        resetQuizState()
        setIsGameFinished(false)
      }, 5000)
    }
  }, [roomData])

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

  // 시작 시 연출
  const sequenceActions: SequenceAction[] = [
    { subtitle: "이번 실험은 반드시 성공시켜야 해. 반드시...!" },
    { subtitle: "...너무 흥분해버렸네. 자, 뭐가 필요하더라?" },
    {
      subtitle: "마취가 깨기 전에 얼른 챙길 것만 챙겨서 나가야겠어.",
    },
    {
      subtitle: "그 전에 데이터를 먼저 백업해두는 게 낫겠군.",
      delay: 10000,
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
              minutes={8}
            />
          )}
          {!isNull && (
            <Start
              setSubtitle={setSubtitle}
              bgmName="HorrorBgm2"
              firstSubtitle="...오랜만에 좋은 실험체를 손에 넣어서 기분이 좋군."
              sequenceActions={sequenceActions}
            />
          )}
        </>
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
        setShowSpider={setShowSpider}
        progressUpdate={progressUpdate}
        role="scientist"
      />
      {isGameFinished && (
        <Result
          type={result}
          themeIdx={3}
          selectedThemeType={selectedThemeType}
        />
      )}
      <Productions ghostIndex={ghostIndex} isFiveMinLater={isFiveMinLater} />
      <PlayPenaltySound penalty={penalty} role="scientist" />
      <BasicScene interactNum={interactNum} mouseSpeed={0.5}>
        <Player position={[3, 40, 0]} speed={80} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, 0.5, 0]}
        />
        <Environment
          files={
            process.env.NEXT_PUBLIC_IMAGE_URL + "/hdr/concrete_tunnel_02_1k.hdr"
          }
          environmentIntensity={environmentIntensity}
          resolution={90}
        >
          <Lightformer intensity={0.5} scale={1} target={[0, 0, 0]} />
        </Environment>
        <MeshObjects />
        <HorrorRoom2 onLoaded={setIsModelLoaded} />
        <Paper isTwoMinLater={isTwoMinLater} />
        <Blood penalty={penalty} role="scientist" />
        <VoodooDoll solved={solved} />
        <CreepyDoll solved={solved} />
        <ScissorDoll isFiveMinLater={isFiveMinLater} />
        <Spider showSpider={showSpider} />
        <Glasses />
        <Interactions
          isTwoMinLater={isTwoMinLater}
          isFiveMinLater={isFiveMinLater}
          handleFirstProblem={handleFirstProblem}
          handleSecondProblem={handleSecondProblem}
          handleThirdProblem={handleThirdProblem}
          progressUpdate={progressUpdate}
        />
      </BasicScene>
    </>
  )
}

export default HorrorTheme2

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
