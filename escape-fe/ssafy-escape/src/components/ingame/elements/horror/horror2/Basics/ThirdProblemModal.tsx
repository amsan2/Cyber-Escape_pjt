import Image from "next/image"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import { useState, useEffect } from "react"
import postAnswer from "@/services/ingame/postAnswer"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import HintModal from "../../../common/HintModal"
import data from "@/data/ingame/horror/HorrorOption.json"
import { useQuery } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"
import useIngameStateStore from "@/stores/IngameStateStore"
import Hint from "../../common/Hint"
import ChoiceButton from "../../common/ChoiceButton"

const themeIndex = 2 // 1: 실험체의 방 2: 과학자의 방
const problemIndex = 2 // 0: 첫 번째 문제 1: 두 번째 문제 2: 세 번째 문제

// 세 번째 문제 모달
const ThirdProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  progressUpdate,
}: HorrorProblemProps) => {
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { solved, hint, setSolved, setHint } = useIngameQuizStore()
  const { openHint, isHintModalOpen, setOpenHint, setIsHintModalOpen } =
    useIngameStateStore()

  const { data: quizData } = useQuery({
    queryKey: ["quizList", 3],
    queryFn: () => getQuiz(3),
  })

  useEffect(() => {
    const fetchOptionData = async () => {
      setIsLoading(true)
      await setOptionData(data)
      setIsLoading(false)
    }
    fetchOptionData()
  }, [])

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
        setSubtitle("이런, 시간이...서둘러 나가야겠군.")
        setTimeout(() => {
          setSubtitle("...아, 제일 중요한 걸 놓고 갈 뻔했네.")
          setTimeout(() => {
            setSubtitle("주사기랑 망치가 어디있지?")
            setTimeout(() => {
              setSubtitle("")
            }, 10000)
          }, 4000)
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
          width={620}
          height={580}
          alt="세번째 문제"
        />
        <CloseIconBox onClick={onClose}>
          <CloseIcon sx={{ fontSize: 30 }} />
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
        bottom={"90px"}
      />
    </MainContainer>
  )
}

export default ThirdProblemModal

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  right: 130px;
  top: 40px;
  z-index: 24;
`
