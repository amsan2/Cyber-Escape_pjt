import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

const Flower = ({ onClick, setInteractNum }: ClickObjectProps) => {
  const flower = useGLTF("/glb/horror/flower.glb", true)

  // 이부분 테스트 해보고 지울 예정
  useEffect(() => {
    if (flower.scene) {
      flower.scene.position.set(1.4582, 1, -5.3756)
    }
  }, [flower])

  return (
    <primitive
      object={flower.scene}
      scale={35}
      onPointerOver={() => setInteractNum(2)}
      onPointerOut={() => setInteractNum(1)}
      onClick={onClick}
    />
  )
}

export default Flower
