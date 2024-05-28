// 조건에 따른 포인터 아이콘 변경
const handlePointerOver = ({
  solved,
  targetSolved,
  targetInteractNum,
  setInteractNum,
}: HandlePointerOverProps) => {
  if (solved === targetSolved) {
    setInteractNum(targetInteractNum)
  }
}

export default handlePointerOver
