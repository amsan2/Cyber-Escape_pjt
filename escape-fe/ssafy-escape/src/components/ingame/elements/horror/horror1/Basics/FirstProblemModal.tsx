import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import postAnswer from "@/services/ingame/postAnswer"
import getQuiz from "@/services/ingame/getQuiz"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import useIngameStateStore from "@/stores/IngameStateStore"
import ChoiceButton from "../../common/ChoiceButton"
import Hint from "../../common/Hint"
import data from "@/data/ingame/horror/HorrorOption.json"

const themeIndex = 1 // 1: 실험체의 방 2: 과학자의 방
const problemIndex = 0 // 0: 첫 번째 문제 1: 두 번째 문제 2: 세 번째 문제

// 첫 번째 문제 모달
const FirstProblemModal = ({
  onClose,
  penalty,
  timePenalty,
  setPenalty,
  setSubtitle,
  progressUpdate,
}: HorrorProblemProps) => {
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)
  const { solved, hint, setSolved, setHint } = useIngameQuizStore()
  const { openHint, isHintModalOpen, setOpenHint, setIsHintModalOpen } =
    useIngameStateStore()

  useEffect(() => {
    setOptionData(data)
  }, [])

  const { data: quizData } = useQuery({
    queryKey: ["quizList", 2],
    queryFn: () => getQuiz(2),
  })

  if (!quizData || !optionData) {
    return null
  }

  // 선지 클릭 시 정답여부 확인
  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[problemIndex].quizUuid, answer)).right) {
      setSolved(solved + 1)
      if (progressUpdate) {
        progressUpdate()
      }
      onClose()
      if (setSubtitle) {
        setSubtitle("뭔가 단서가 될 만한 것을 찾아봐야겠어.")
        setTimeout(() => {
          setSubtitle("서랍장을 한번 뒤져볼까?")
          setTimeout(() => {
            setSubtitle("")
          }, 10000)
        }, 4000)
      }
    } else {
      alert("오답!")
      timePenalty()
      if (penalty && setPenalty) {
        setPenalty(penalty + 1)
      }
    }
  }

  return (
    <MainContainer>
      <>
        <img
          src={quizData[problemIndex].url}
          width={600}
          height={550}
          alt="첫번째 문제"
        />
        <CloseIconBox onClick={onClose}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </CloseIconBox>
        <ChoiceBox1>
          {[0, 1].map((choiceIndex) => (
            <ChoiceButton
              key={choiceIndex}
              optionData={optionData}
              quizData={quizData}
              handleAnswerCheck={handleAnswerCheck}
              themeIndex={themeIndex}
              problemIndex={problemIndex}
              choiceIndex={choiceIndex}
            />
          ))}
        </ChoiceBox1>
        <ChoiceBox2>
          {[2, 3].map((choiceIndex) => (
            <ChoiceButton
              key={choiceIndex}
              optionData={optionData}
              quizData={quizData}
              handleAnswerCheck={handleAnswerCheck}
              themeIndex={themeIndex}
              problemIndex={problemIndex}
              choiceIndex={choiceIndex}
            />
          ))}
        </ChoiceBox2>
      </>
      <Hint
        isHintModalOpen={isHintModalOpen}
        setIsHintModalOpen={setIsHintModalOpen}
        hint={hint}
        setHint={setHint}
        openHint={openHint}
        setOpenHint={setOpenHint}
        timePenalty={timePenalty}
        quizData={quizData}
        problemIndex={problemIndex}
        left={"165px"}
        top={"70px"}
      />
    </MainContainer>
  )
}

export default FirstProblemModal

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 20;
`

const ChoiceBox1 = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-40%, 20%);
  gap: 30px;
  margin-top: 30px;
`

const ChoiceBox2 = styled(ChoiceBox1)`
  top: 50%;
  transform: translate(-40%, 45%);
`

const CloseIconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 110px;
  top: 75px;
  z-index: 10;
`
