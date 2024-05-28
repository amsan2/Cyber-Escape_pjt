import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import useIngameStateStore from "@/stores/IngameStateStore"
import postAnswer from "@/services/ingame/postAnswer"
import getQuiz from "@/services/ingame/getQuiz"
import ChoiceButton from "../../common/ChoiceButton"
import Hint from "../../common/Hint"
import data from "@/data/ingame/horror/HorrorOption.json"

const themeIndex = 2 // 1: 실험체의 방 2: 과학자의 방
const problemIndex = 0 // 0: 첫 번째 문제 1: 두 번째 문제 2: 세 번째 문제

// 첫 번째 문제 모달
const FirstProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  setShowSpider,
  progressUpdate,
}: HorrorProblemProps) => {
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { solved, hint, setSolved, setHint } = useIngameQuizStore()
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
    queryKey: ["quizList", 3],
    queryFn: () => getQuiz(3),
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
      setTimeout(() => {
        if (setShowSpider) {
          setShowSpider(true)
        }
      }, 500)
      if (setSubtitle) {
        setSubtitle("이제 백업은 됐고...")
        setTimeout(() => {
          setSubtitle(
            "이 근처에 실험에 쓸 약물에 대해 적어놓은 메모가 있었던 것 같은데...버렸나?",
          )
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
        left={"70px"}
        top={"63px"}
      />
    </MainContainer>
  )
}

export default FirstProblemModal

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 52%;
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
  right: 65px;
  top: 60px;
  z-index: 10;
`
