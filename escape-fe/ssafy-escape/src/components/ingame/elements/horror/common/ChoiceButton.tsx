import Button from "@/components/common/Button"

// 문제 모달 선지 버튼(투명)
const ChoiceButton = ({
  optionData,
  quizData,
  handleAnswerCheck,
  themeIndex,
  problemIndex,
  choiceIndex,
}: ChoiceButtonProps) => {
  const answer =
    optionData[`horror${themeIndex}QuizList`][quizData[problemIndex].quizUuid][
      choiceIndex
    ]
  return (
    <Button
      theme="fail"
      width="100px"
      height="40px"
      opacity="0"
      onClick={() => handleAnswerCheck(answer)}
    />
  )
}

export default ChoiceButton
