import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

const ScissorDoll = ({ isFiveMinLater }: TimeProps) => {
  const { scene: doll } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/scissor_doll.glb",
    true,
  )
  useEffect(() => {
    if (doll) {
      doll.position.set(-70.5, 70, 51)
      doll.rotation.set(0, 2, 0)
    }
  }, [doll])
  return isFiveMinLater && <primitive object={doll} scale={10} />
}

export default ScissorDoll
