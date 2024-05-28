import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

const Wall = () => {
  const { scene: wall } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/wall.glb",
    true,
  )
  useEffect(() => {
    if (wall) {
      wall.rotation.set(0, Math.PI, 0)
      wall.renderOrder = -1
    }
  }, [wall])
  return <primitive object={wall} scale={35} />
}

export default Wall
