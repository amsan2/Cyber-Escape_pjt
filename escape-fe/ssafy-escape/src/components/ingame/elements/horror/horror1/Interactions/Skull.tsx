import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import handlePointerOver from "@/utils/handlePointerOver"

const Skull = ({ onClick, solved, setInteractNum }: ClickObjectProps) => {
  const {scene: skull} = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/skull.glb",
    true,
  )

  useEffect(() => {
    if (skull) {
      skull.position.set(-20, 6, -3)
      skull.rotation.set(0, 0, 80)
    }
  }, [skull, solved])

  return (
    <primitive
      object={skull}
      scale={40}
      onPointerOver={() =>
        handlePointerOver({
          solved,
          targetSolved: 0,
          targetInteractNum: 1,
          setInteractNum,
        })
      }
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Skull