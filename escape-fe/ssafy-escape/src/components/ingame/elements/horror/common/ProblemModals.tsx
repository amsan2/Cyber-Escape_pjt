import FirstProblemModal from "../horror1/Basics/FirstProblemModal"
import SecondProblemModal from "../horror1/Basics/SecondProblemModal"
import ThirdProblemModal from "../horror1/Basics/ThirdProblemModal"

const ProblemModals = ({
  showFirstProblem,
  showSecondProblem,
  showThirdProblem,
  handleFirstProblem,
  handleSecondProblem,
  handleThirdProblem,
  penalty,
  timePenalty,
  setPenalty,
  setSubtitle,
}: ProblemModalsProps) => {
  return (
    <>
      {showFirstProblem && (
        <FirstProblemModal
          onClose={handleFirstProblem}
          penalty={penalty}
          timePenalty={timePenalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
        />
      )}

      {showSecondProblem && (
        <SecondProblemModal
          onClose={handleSecondProblem}
          penalty={penalty}
          timePenalty={timePenalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
        />
      )}

      {showThirdProblem && (
        <ThirdProblemModal
          onClose={handleThirdProblem}
          penalty={penalty}
          timePenalty={timePenalty}
          setPenalty={setPenalty}
          setSubtitle={setSubtitle}
        />
      )}
    </>
  )
}

export default ProblemModals
