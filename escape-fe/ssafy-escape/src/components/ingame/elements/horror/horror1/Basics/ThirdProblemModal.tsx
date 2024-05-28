import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import postAnswer from "@/services/ingame/postAnswer"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import getQuiz from "@/services/ingame/getQuiz"
import data from "@/data/ingame/horror/HorrorOption.json"
import Hint from "../../common/Hint"
import ChoiceButton from "../../common/ChoiceButton"
import useIngameStateStore from "@/stores/IngameStateStore"
import ShowGhost from "../../common/ShowGhost"

const themeIndex = 1 // 1: 실험체의 방 2: 과학자의 방
const problemIndex = 2 // 0: 첫 번째 문제 1: 두 번째 문제 2: 세 번째 문제

// 세 번째 문제 모달
const ThirdProblemModal = ({
  onClose,
  penalty,
  setPenalty,
  setSubtitle,
  timePenalty,
  progressUpdate,
}: ProblemProps) => {
  const [optionData, setOptionData] = useState<HorrorOptionData | null>(null)
  const [index, setIndex] = useState(0)
  const [isShowGhost, setIsShowGhost] = useState<boolean>(false)
  const { solved, hint, setSolved, setHint } = useIngameQuizStore()
  const { openHint, isHintModalOpen, setOpenHint, setIsHintModalOpen } =
    useIngameStateStore()

  useEffect(() => {
    // 선지 데이터 저장
    setOptionData(data)

    // 귀신 사진 랜덤 인덱스 저장
    const randomIndex = Math.floor(Math.random() * 10)
    setIndex(randomIndex)

    // 일정 시간 후 귀신 등장
    const showGhost = setTimeout(() => {
      const showImg = setTimeout(() => {
        setIsShowGhost(true)
        const hideImg = setTimeout(() => {
          setIsShowGhost(false)
        }, 1300)
        return () => clearTimeout(hideImg)
      }, 500)
      return () => clearTimeout(showImg)
    }, 5000)
    return () => clearTimeout(showGhost)
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
    if ((await postAnswer(quizData[2].quizUuid, answer)).right) {
      if (progressUpdate) {
        progressUpdate()
      }
      setSolved(solved + 1)
      onClose()
      if (setSubtitle) {
        setSubtitle("...그러고 보니 처음부터 문고리가 없었던 것 같은데.")
        setTimeout(() => {
          setSubtitle("마지막 희망이야.")
          setTimeout(() => {
            setSubtitle("문고리...문고리를 찾아야 해.")
            setTimeout(() => {
              setSubtitle("")
            }, 10000)
          }, 4000)
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
    <>
      <MainContainer>
        <>
          <ShowGhost
            penalty={penalty}
            isShowGhost={isShowGhost}
            index={index}
          />
          <img
            src={quizData[problemIndex].url}
            width={620}
            height={580}
            alt="세번째 문제"
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
    </>
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
