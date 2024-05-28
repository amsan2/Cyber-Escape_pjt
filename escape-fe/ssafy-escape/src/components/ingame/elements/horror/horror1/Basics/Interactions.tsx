import { useState } from "react"
import useIngameStateStore from "@/stores/IngameStateStore"
import useUserStore from "@/stores/UserStore"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import Flower from "../Interactions/Flower"
import HorrorRoom from "./HorrorRoom"
import Knob from "../Interactions/Knob"
import SecondProblemObject from "../Interactions/SecondProblemObject"
import Skull from "../Interactions/Skull"
import ThirdProblemObject from "../Interactions/ThirdProblemObject"
import SingleVictory from "../../common/SingleVictory"

// 상호작용되는 오브젝트들
const Interactions = ({
  isFlowerClicked,
  setIsFlowerClicked,
  setIsModelLoaded,
  handleFirstProblem,
  handleSecondProblem,
  handleThirdProblem,
}: Horror1InteractionsProps) => {
  const [isKnobClicked, setIsKnobClicked] = useState<boolean>(false)
  const { userUuid } = useUserStore()
  const { solved } = useIngameQuizStore()

  const {
    setSubtitle,
    setInteractNum,
    setResult,
    setClearTime,
    setIsGameFinished,
  } = useIngameStateStore()

  // 침대 위 꽃 클릭 시 이벤트
  const handleFlowerClick = () => {
    setIsFlowerClicked(true)
    setInteractNum(1)
  }

  // 숨겨진 문고리 찾아서 클릭 시
  const handleKnobClick = async () => {
    // 문고리 찾은 경우
    if (!isKnobClicked) {
      setIsKnobClicked(true)
      setSubtitle("얼른, 얼른 밖으로 나가야 해.")
      setTimeout(() => {
        setSubtitle("제발 열려라, 제발...")
        setTimeout(() => {
          setSubtitle("")
        }, 4000)
      }, 4000)
    } else {
      // 문고리 찾아서 원위치로 돌아간 문고리 클릭 시 점수 갱신하고 게임 종료
      SingleVictory({
        userUuid,
        selectedTheme: 1,
        setClearTime,
        setResult,
        setIsGameFinished,
      })
    }
  }

  return (
    <>
      {!isFlowerClicked && (
        <Flower onClick={handleFlowerClick} setInteractNum={setInteractNum} />
      )}
      <Knob
        onClick={handleKnobClick}
        isFind={isKnobClicked}
        solved={solved}
        setInteractNum={setInteractNum}
      />
      <HorrorRoom onLoaded={setIsModelLoaded} />
      <Skull
        onClick={handleFirstProblem}
        solved={solved}
        setInteractNum={setInteractNum}
      />
      <SecondProblemObject
        onClick={handleSecondProblem}
        solved={solved}
        setInteractNum={setInteractNum}
      />
      <ThirdProblemObject
        onClick={handleThirdProblem}
        solved={solved}
        setInteractNum={setInteractNum}
      />
    </>
  )
}

export default Interactions
