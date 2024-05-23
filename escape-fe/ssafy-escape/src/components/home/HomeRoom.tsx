import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"

// 배경이 되는 3D방 모델
const HomeRoom = ({ onLoaded }: RoomProps) => {
  const gltf = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/home_Room.glb",
    true,
  )

  // 모델이 완전히 load 된 후 나머지 요소들 출력
  useEffect(() => {
    if (gltf) {
      onLoaded(true)
      gltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [gltf, onLoaded])

  return <primitive object={gltf.scene} scale={1} />
}

export default HomeRoom
