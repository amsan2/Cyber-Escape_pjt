import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { Mesh } from "three"

const SsafyClassRoom = ({ onLoaded }: RoomProps) => {
  const { scene } = useGLTF("/glb/ssafy/conference_room.glb", true)

  useEffect(() => {
    if (scene) {
      scene.renderOrder = 0
      scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      onLoaded(true)
    }
  }, [scene, onLoaded])

  return <primitive object={scene} scale={10} />
}

export default SsafyClassRoom