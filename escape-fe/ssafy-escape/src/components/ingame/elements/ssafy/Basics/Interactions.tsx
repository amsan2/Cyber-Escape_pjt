import useUserStore from "@/stores/UserStore"
import useIngameThemeStore from "@/stores/IngameThemeStore"
import useIngameStateStore from "@/stores/IngameStateStore"
import ThirdProblemObject from "../Interactions/ThirdProblemObject"
import Notebook1 from "../Interactions/NoteBook1"
import Notebook2 from "../Interactions/NoteBook2"
import FinalDoorObject from "../Interactions/FinalDoorObject"
import SingleVictory from "../../horror/common/SingleVictory"

// 상호작용되는 오브젝트들
const Interactions = ({
  handleFirstProblem,
  handleSecondProblem,
  handleThirdProblem,
  progressUpdate,
  timerRef,
}: InteractionsProps) => {
  const { selectedThemeType } = useIngameThemeStore()
  const { userUuid } = useUserStore()
  const {
    isSolvedFirstProblem,
    isSolvedSecondProblem,
    isSolvedThirdProblem,
    setInteractNum,
    setResult,
    setClearTime,
    setIsGameFinished,
  } = useIngameStateStore()

  // 마지막 문 클릭 시
  const handleFinal = async () => {
    if (selectedThemeType === "single") {
      SingleVictory({
        timerRef,
        userUuid,
        selectedTheme: 4,
        setClearTime,
        setResult,
        setIsGameFinished,
        minute: 5,
      })
      if (progressUpdate) {
        progressUpdate()
      }
    }
  }

  return (
    <>
      <Notebook1
        onClick={handleFirstProblem}
        setInteractNum={setInteractNum}
        isSolvedProblem={isSolvedFirstProblem}
      />
      <Notebook2
        onClick={handleSecondProblem}
        setInteractNum={setInteractNum}
        isSolvedProblem={isSolvedSecondProblem}
      />
      {!isSolvedThirdProblem && (
        <ThirdProblemObject
          onClick={handleThirdProblem}
          setInteractNum={setInteractNum}
          isSolvedProblem={isSolvedThirdProblem}
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
