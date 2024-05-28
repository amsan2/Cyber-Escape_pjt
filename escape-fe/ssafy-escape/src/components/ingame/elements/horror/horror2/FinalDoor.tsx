import { useGLTF } from "@react-three/drei"
import handlePointerOver from "@/utils/handlePointerOver"

const FinalDoor = ({ onClick, setInteractNum, solved }: ClickObjectProps) => {
  const finalDoor = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/final_door.glb",
    true,
  )
  return (
    <primitive
      object={finalDoor.scene}
      scale={35}
      onPointerOver={() =>
        handlePointerOver({
          solved,
          targetSolved: 3,
          targetInteractNum: 3,
          setInteractNum,
        })
      }
      onPointerOut={() => setInteractNum(1)}
      onClick={() => onClick()}
    />
  )
}

export default FinalDoor
