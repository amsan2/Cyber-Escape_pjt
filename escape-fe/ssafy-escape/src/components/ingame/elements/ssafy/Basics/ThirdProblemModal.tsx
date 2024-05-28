import { styled } from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@/components/common/Button"
import postAnswer from "@/services/ingame/postAnswer"
import { useQuery } from "@tanstack/react-query"
import getQuiz from "@/services/ingame/getQuiz"

const problemIndex = 2 // 0: 첫 번째 문제 1: 두 번째 문제 2: 세 번째 문제

// 세 번째 문제 모달
const ThirdProblemModal = ({
  onClose,
  timePenalty,
  setIsSolvedProblem,
  progressUpdate,
}: SSAFYProblemProps) => {
  const { data: quizData } = useQuery({
    queryKey: ["quizList", 5],
    queryFn: () => getQuiz(5),
  })

  if (!quizData) {
    return
  }

  // 선지 클릭 시 정답여부 확인
  const handleAnswerCheck = async (answer: string) => {
    if ((await postAnswer(quizData[problemIndex].quizUuid, answer)).right) {
      setIsSolvedProblem(true)
      if (progressUpdate) {
        progressUpdate()
      }
      onClose()
    } else {
      alert("오답!")
      timePenalty()
    }
  }

  return (
    <MainContainer>
      <>
        <img
          src={quizData[problemIndex].url}
          width={600}
          height={550}
          alt="세번째 문제"
        />
        <CloseIconBox onClick={onClose}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </CloseIconBox>
        <ChoiceBox>
          {["1", "2", "3", "4"].map((choiceIndex) => (
            <Button
              key={choiceIndex}
              theme="fail"
              width="350px"
              height="30px"
              opacity="0"
              onClick={() => handleAnswerCheck(choiceIndex)}
            />
          ))}
        </ChoiceBox>
      </>
    </MainContainer>
  )
}

export default ThirdProblemModal

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

const ChoiceBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 37%;
  transform: translate(-40%, 10%);
  gap: 15px;
  margin-top: 30px;
`

const CloseIconBox = styled.div`
  position: absolute;
  cursor: pointer;
  right: 30px;
  top: 30px;
  z-index: 10;
`
