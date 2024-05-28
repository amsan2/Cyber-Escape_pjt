import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"

// 로딩 오래 걸리는 큰 모델들은 onLoaded 적용해서 나머지 요소들과 함께 출력되도록 처리
const HorrorRoom2 = ({ onLoaded }: RoomProps) => {
  const { scene: horror_room2 } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/horror_room2.glb",
    true,
  )

  useEffect(() => {
    if (horror_room2) {
      horror_room2.renderOrder = 0
      horror_room2.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      onLoaded(true)
    }
  }, [horror_room2, onLoaded])

  return <primitive object={horror_room2} scale={35} />
}

export default HorrorRoom2
