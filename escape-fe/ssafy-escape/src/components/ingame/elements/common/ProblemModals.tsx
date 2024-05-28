import Horror1FirstProblemModal from "../horror/horror1/Basics/FirstProblemModal"
import Horror1SecondProblemModal from "../horror/horror1/Basics/SecondProblemModal"
import Horror1ThirdProblemModal from "../horror/horror1/Basics/ThirdProblemModal"
import Horror2FirstProblemModal from "../horror/horror2/Basics/FirstProblemModal"
import Horror2SecondProblemModal from "../horror/horror2/Basics/SecondProblemModal"
import Horror2ThirdProblemModal from "../horror/horror2/Basics/ThirdProblemModal"
import Ssafy1FirstProblemModal from "@/components/ingame/elements/ssafy/Basics/FirstProblemModal"
import Ssafy1SecondProblemModal from "@/components/ingame/elements/ssafy/Basics/SecondProblemModal"
import Ssafy1ThirdProblemModal from "@/components/ingame/elements/ssafy/Basics/ThirdProblemModal"
import Ssafy2FirstProblemModal from "@/components/ingame/elements/ssafy2/Basics/FirstProblemModal"
import Ssafy2SecondProblemModal from "@/components/ingame/elements/ssafy2/Basics/SecondProblemModal"
import Ssafy2ThirdProblemModal from "@/components/ingame/elements/ssafy2/Basics/ThirdProblemModal"

const modalComponents: {
  [key: string]: ((props: any) => JSX.Element | null | undefined)[]
} = {
  experiment: [
    Horror1FirstProblemModal,
    Horror1SecondProblemModal,
    Horror1ThirdProblemModal,
  ],
  scientist: [
    Horror2FirstProblemModal,
    Horror2SecondProblemModal,
    Horror2ThirdProblemModal,
  ],
  trainee: [
    Ssafy1FirstProblemModal,
    Ssafy1SecondProblemModal,
    Ssafy1ThirdProblemModal,
  ],
  pro: [
    Ssafy2FirstProblemModal,
    Ssafy2SecondProblemModal,
    Ssafy2ThirdProblemModal,
  ],
}

const ProblemModals = ({
  showFirstProblem,
  showSecondProblem,
  showThirdProblem,
  handleFirstProblem,
  handleSecondProblem,
  handleThirdProblem,
  isSolvedFirstProblem,
  isSolvedSecondProblem,
  isSolvedThirdProblem,
  setIsSolvedFirstProblem,
  setIsSolvedSecondProblem,
  setIsSolvedThirdProblem,
  penalty,
  timePenalty,
  setPenalty,
  setSubtitle,
  setShowSpider,
  role,
  progressUpdate,
}: ProblemModalsProps) => {
  const modals = modalComponents[role] || []

  const FirstProblemModal = modals[0]
  const SecondProblemModal = modals[1]
  const ThirdProblemModal = modals[2]

  return (
    <>
      {role === "experiment" || role === "scientist" ? (
        <>
          {showFirstProblem && FirstProblemModal && (
            <FirstProblemModal
              onClose={handleFirstProblem}
              penalty={penalty}
              timePenalty={timePenalty}
              setPenalty={setPenalty}
              setSubtitle={setSubtitle}
              setShowSpider={setShowSpider}
              progressUpdate={progressUpdate}
            />
          )}
          {showSecondProblem && SecondProblemModal && (
            <SecondProblemModal
              onClose={handleSecondProblem}
              penalty={penalty}
              timePenalty={timePenalty}
              setPenalty={setPenalty}
              setSubtitle={setSubtitle}
              progressUpdate={progressUpdate}
            />
          )}
          {showThirdProblem && ThirdProblemModal && (
            <ThirdProblemModal
              onClose={handleThirdProblem}
              penalty={penalty}
              timePenalty={timePenalty}
              setPenalty={setPenalty}
              setSubtitle={setSubtitle}
              progressUpdate={progressUpdate}
            />
          )}
        </>
      ) : (
        <>
          {showFirstProblem && FirstProblemModal && !isSolvedFirstProblem && (
            <FirstProblemModal
              onClose={handleFirstProblem}
              timePenalty={timePenalty}
              progressUpdate={progressUpdate}
              setIsSolvedProblem={setIsSolvedFirstProblem}
            />
          )}
          {showSecondProblem &&
            SecondProblemModal &&
            !isSolvedSecondProblem && (
              <SecondProblemModal
                onClose={handleSecondProblem}
                timePenalty={timePenalty}
                progressUpdate={progressUpdate}
                setIsSolvedProblem={setIsSolvedSecondProblem}
              />
            )}
          {showThirdProblem && ThirdProblemModal && !isSolvedThirdProblem && (
            <ThirdProblemModal
              onClose={handleThirdProblem}
              timePenalty={timePenalty}
              progressUpdate={progressUpdate}
              setIsSolvedProblem={setIsSolvedThirdProblem}
            />
          )}
        </>
      )}
    </>
  )
}

export default ProblemModals
