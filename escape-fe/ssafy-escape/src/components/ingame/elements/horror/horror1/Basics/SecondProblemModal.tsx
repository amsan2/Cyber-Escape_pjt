import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import useIngameStateStore from "@/stores/IngameStateStore"
import postAnswer from "@/services/ingame/postAnswer"
import getQuiz from "@/services/ingame/getQuiz"
import Hint from "../../common/Hint"
import ChoiceButton from "../../common/ChoiceButton"
import data from "@/data/ingame/horror/HorrorOption.json"

const themeIndex = 1 // 1: 실험체의 방 2: 과학자의 방
const problemIndex = 1 // 0: 첫 번째 문제 1: 두 번째 문제 2: 세 번째 문제

// 두 번째 문제 모달
const SecondProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  progressUpdate,
}: HorrorProblemProps) => {
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)
  const { solved, hint, setSolved, setHint } = useIngameQuizStore()
  const [isLoading, setIsLoading] = useState(true)
  const { openHint, isHintModalOpen, setOpenHint, setIsHintModalOpen } =
    useIngameStateStore()

  useEffect(() => {
    const fetchOptionData = async () => {
      setIsLoading(true)
      await setOptionData(data)
      setIsLoading(false)
    }
    fetchOptionData()
  }, [])

  const { data: quizData } = useQuery({
    queryKey: ["quizList", 2],
    queryFn: () => getQuiz(2),
  })

  if (isLoading || !quizData || !optionData) {
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
        setSubtitle("...정신이 이상해지는 것 같아.")
        setTimeout(() => {
          setSubtitle("혹시 책들 중에 단서가 있지 않을까?")
          setTimeout(() => {
            setSubtitle("")
          }, 10000)
        }, 4000)
      }
    } else {
      alert("오답!")
      timePenalty()
      setPenalty((currentPenalty: number) => currentPenalty + 1)
    }
  }

  return (
    <MainContainer>
      <>
        <img
          src={quizData[problemIndex].url}
          width={550}
          height={550}
          alt="두번째 문제"
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
        left={"60px"}
        top={"90px"}
      />
    </MainContainer>
  )
}

export default SecondProblemModal

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
  transform: translate(-40%, 30%);
  gap: 60px;
  margin-top: 30px;
`

const ChoiceBox2 = styled(ChoiceBox1)`
  top: 53%;
  transform: translate(-40%, 45%);
`

const CloseIconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 60px;
  top: 92px;
  z-index: 10;
`
