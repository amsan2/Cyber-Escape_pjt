import { useEffect, useMemo } from "react"
import { useGLTF } from "@react-three/drei"

// 두 번째 문제 오브젝트
// 구겨서 뭉친 종이(랜덤 6곳, 시간 남으면 추가 예정)
const ScrunchedPaper = ({
  onClick,
  setInteractNum,
  solved,
}: ClickObjectProps) => {
  const { scene: scrunchedPaper } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/scrunched_paper.glb",
    true,
  )
  const scrunchedPaperPosition: [number, number, number][] = [
    [88, 10, -26],
    [97, 11, 44],
    [98, 11, 29],
    [83, 11, 48],
    [69, 11, 57],
    [-70, 11, -10],
  ]

  const { randomIndex } = useMemo(() => {
    const randomIndex = Math.floor(
      Math.random() * scrunchedPaperPosition.length,
    )
    return { randomIndex }
  }, [])

  useEffect(() => {
    if (scrunchedPaper) {
      scrunchedPaper.position.set(
        scrunchedPaperPosition[randomIndex][0],
        scrunchedPaperPosition[randomIndex][1],
        scrunchedPaperPosition[randomIndex][2],
      )
    }
  }, [scrunchedPaper])

  return (
    solved == 1 && (
      <primitive
        object={scrunchedPaper}
        scale={0.3}
        onPointerOver={() => setInteractNum(2)}
        onPointerOut={() => setInteractNum(1)}
        onClick={() => onClick()}
      />
    )
  )
}

export default ScrunchedPaper
