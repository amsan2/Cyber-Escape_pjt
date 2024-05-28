import { useGLTF } from "@react-three/drei"
import handlePointerOver from "@/utils/handlePointerOver"

const Computer = ({ onClick, setInteractNum, solved }: ClickObjectProps) => {
  const {scene: computer} = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/computer.glb",
    true,
  )
  return (
    <primitive
      object={computer}
      scale={35}
      onPointerOver={() =>
        handlePointerOver({
          solved,
          targetSolved: 0,
          targetInteractNum: 2,
          setInteractNum,
        })
      }
      onPointerOut={() => setInteractNum(1)}
      onClick={() => onClick()}
    />
  )
}

export default Computer
