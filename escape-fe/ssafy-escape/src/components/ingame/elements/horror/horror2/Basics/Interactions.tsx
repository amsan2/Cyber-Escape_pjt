import { useEffect, useState } from "react"
import useIngameStateStore from "@/stores/IngameStateStore"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import Hammer from "../Interactions/Hammer"
import Syringe from "../Interactions/Syringe"
import FinalDoor from "../Interactions/FinalDoor"
import ScrunchedPaper from "../Interactions/ScrunchedPaper"
import ThirdProblemObject from "../Interactions/ThirdProblemObject"
import Computer from "../Interactions/Computer"

// 상호작용되는 오브젝트들
const Interactions = ({
  handleFirstProblem,
  handleSecondProblem,
  handleThirdProblem,
  progressUpdate,
}: HorrorInteractionsProps) => {
  const [isSyringeClicked, setIsSyringeClicked] = useState<boolean>(false)
  const [isHammerClicked, setIsHammerClicked] = useState<boolean>(false)
  const { solved } = useIngameQuizStore()

  const {
    setSubtitle,
    setInteractNum,
  } = useIngameStateStore()

  // 주사기 클릭 시 이벤트
  const handleSyringeClick = () => {
    if (solved === 3) {
      setIsSyringeClicked(true)
      setInteractNum(1)
    }
  }

  // 망치 클릭 시 이벤트
  const handleHammerClick = () => {
    if (solved === 3) {
      setIsHammerClicked(true)
      setInteractNum(1)
    }
  }

  useEffect(() => {
    // 필요한 물품들을 다 챙겼을 시 이벤트(자막)
    if (isHammerClicked && isSyringeClicked) {
      setSubtitle("이제 필요한 건 다 챙긴 것 같은데.")
      setTimeout(() => {
        setSubtitle("슬슬 나가지 않으면 늦겠어.")
        setTimeout(() => {
          setSubtitle("")
        }, 4000)
      }, 4000)
    }
  }, [isHammerClicked, isSyringeClicked])

  // 마지막 문 클릭 시 이벤트
  const handleFinal = async () => {
    if (isHammerClicked && isSyringeClicked) {
      if (progressUpdate) {
        progressUpdate()
      }
    }
  }

  return (
    <>
      {!isSyringeClicked && (
        <Syringe
          onClick={handleSyringeClick}
          setInteractNum={setInteractNum}
          solved={solved}
        />
      )}
      <Computer
        onClick={handleFirstProblem}
        solved={solved}
        setInteractNum={setInteractNum}
      />
      {!isHammerClicked && (
        <Hammer
          onClick={handleHammerClick}
          setInteractNum={setInteractNum}
          solved={solved}
        />
      )}
      <FinalDoor
        onClick={handleFinal}
        setInteractNum={setInteractNum}
        solved={solved}
      />
      <ScrunchedPaper
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
