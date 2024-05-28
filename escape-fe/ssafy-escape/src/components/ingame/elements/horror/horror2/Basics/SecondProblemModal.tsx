import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import useIngameQuizStore from "@/stores/IngameQuizStore"
import useIngameStateStore from "@/stores/IngameStateStore"
import postAnswer from "@/services/ingame/postAnswer"
import getQuiz from "@/services/ingame/getQuiz"
import data from "@/data/ingame/horror/HorrorOption.json"
import ShowGhost from "../../common/ShowGhost"
import Hint from "../../common/Hint"
import ChoiceButton from "../../common/ChoiceButton"

const themeIndex = 2 // 1: 실험체의 방 2: 과학자의 방
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
  const [index, setIndex] = useState(0)
  const [isShowGhost, setIsShowGhost] = useState<boolean>(false)
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
      if (setSubtitle) {
        setSubtitle("...아, 기록하려면 노트도 챙겨야지.")
        setTimeout(() => {
          setSubtitle("책장 어디에 꽂아놨던 것 같은데...")
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
    <>
      <ShowGhost penalty={penalty} isShowGhost={isShowGhost} index={index} />
      <MainContainer>
        <>
          <img
            src={quizData[problemIndex].url}
            width={600}
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
          left={"165px"}
          top={"72px"}
        />
      </MainContainer>
    </>
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
  right: 110px;
  top: 75px;
  z-index: 10;
`
