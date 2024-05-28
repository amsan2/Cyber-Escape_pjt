import useIngameStateStore from "@/stores/IngameStateStore"
import Diary from "../Interactions/Diary"
import FirstProblemObject from "../Interactions/FirstProblemObject"
import SecondProblemObject from "../Interactions/SecondProblemObject"
import FinalDoorObject from "../Interactions/FinalDoorObject"

// 상호작용되는 오브젝트들
const Interactions = ({
  handleFirstProblem,
  handleSecondProblem,
  handleThirdProblem,
  progressUpdate,
}: InteractionsProps) => {
  const {
    isSolvedFirstProblem,
    isSolvedSecondProblem,
    isSolvedThirdProblem,
    setInteractNum,
  } = useIngameStateStore()

  // 마지막 문 클릭 시
  const handleFinal = async () => {
    if (progressUpdate) {
      progressUpdate()
    }
  }

  return (
    <>
      <Diary
        onClick={handleThirdProblem}
        setInteractNum={setInteractNum}
        isSolvedProblem={isSolvedThirdProblem}
      />
      {!isSolvedFirstProblem && (
        <FirstProblemObject
          onClick={handleFirstProblem}
          setInteractNum={setInteractNum}
        />
      )}
      {!isSolvedSecondProblem && (
        <SecondProblemObject
          onClick={handleSecondProblem}
          setInteractNum={setInteractNum}
        />
      )}
      {isSolvedFirstProblem &&
        isSolvedSecondProblem &&
        isSolvedThirdProblem && (
          <FinalDoorObject
            onClick={handleFinal}
            setInteractNum={setInteractNum}
          />
        )}
    </>
  )
}

export default Interactions
