import { useEffect, useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import handlePointerOver from "@/utils/handlePointerOver"

// 마지막 탈출하기 전 찾을 망치 랜덤 4곳 (시간 남으면 더 추가할 예정)
const Hammer = ({ onClick, solved, setInteractNum }: ClickObjectProps) => {
  const { scene: hammer } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/hammer.glb",
    true,
  )
  const objectArr: [number, number, number][][] = [
    [
      [25, 12, -58],
      [0, 0, 9],
    ],
    [
      [-85, 12, -57],
      [0, 0, 9.8],
    ],
    [
      [0.2, 12, 50],
      [0, 0, 9.8],
    ],
    [
      [95.5, 12, 35],
      [0, 0, 9],
    ],
  ]

  const { randomIndex } = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * objectArr.length)
    return { randomIndex }
  }, [])

  useEffect(() => {
    if (hammer) {
      hammer.position.set(
        objectArr[randomIndex][0][0],
        objectArr[randomIndex][0][1],
        objectArr[randomIndex][0][2],
      )
      hammer.rotation.set(
        objectArr[randomIndex][1][0],
        objectArr[randomIndex][1][1],
        objectArr[randomIndex][1][2],
      )
    }
  }, [hammer, solved])

  return (
    <primitive
      object={hammer}
      scale={2}
      onPointerOver={() =>
        handlePointerOver({
          solved,
          targetSolved: 3,
          targetInteractNum: 2,
          setInteractNum,
        })
      }
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Hammer
