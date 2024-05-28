import Horror1FirstProblemModal from "../horror1/Basics/FirstProblemModal"
import Horror1SecondProblemModal from "../horror1/Basics/SecondProblemModal"
import Horror1ThirdProblemModal from "../horror1/Basics/ThirdProblemModal"
import Horror2FirstProblemModal from "../horror2/Basics/FirstProblemModal"
import Horror2SecondProblemModal from "../horror2/Basics/SecondProblemModal"
import Horror2ThirdProblemModal from "../horror2/Basics/ThirdProblemModal"
import Ssafy1FirstProblemModal from "@/components/ingame/elements/ssafy/Basics/FirstProblemModal"
import Ssafy1SecondProblemModal from "@/components/ingame/elements/ssafy/Basics/FirstProblemModal"
import Ssafy1ThirdProblemModal from "@/components/ingame/elements/ssafy/Basics/FirstProblemModal"
import Ssafy2FirstProblemModal from "@/components/ingame/elements/ssafy2/Basics/FirstProblemModal"
import Ssafy2SecondProblemModal from "@/components/ingame/elements/ssafy2/Basics/FirstProblemModal"
import Ssafy2ThirdProblemModal from "@/components/ingame/elements/ssafy2/Basics/FirstProblemModal"

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
  penalty,
  timePenalty,
  setPenalty,
  setSubtitle,
  setIsSolvedProblem,
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
          {showFirstProblem && FirstProblemModal && (
            <FirstProblemModal
              onClose={handleFirstProblem}
              timePenalty={timePenalty}
              progressUpdate={progressUpdate}
              setIsSolvedProblem={setIsSolvedProblem}
            />
          )}
          {showSecondProblem && SecondProblemModal && (
            <SecondProblemModal
              onClose={handleFirstProblem}
              timePenalty={timePenalty}
              progressUpdate={progressUpdate}
              setIsSolvedProblem={setIsSolvedProblem}
            />
          )}
          {showThirdProblem && ThirdProblemModal && (
            <ThirdProblemModal
              onClose={handleFirstProblem}
              timePenalty={timePenalty}
              progressUpdate={progressUpdate}
              setIsSolvedProblem={setIsSolvedProblem}
            />
          )}
        </>
      )}
    </>
  )
}

export default ProblemModals
