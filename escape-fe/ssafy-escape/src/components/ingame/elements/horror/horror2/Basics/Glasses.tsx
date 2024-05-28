import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

const Glasses = () => {
  const {scene: glasses} = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror2/bloody_glasses.glb",
    true,
  )
  useEffect(() => {
    if (glasses) {
      glasses.position.set(38, 31.2, 58)
      glasses.rotation.set(0, -0.6, 0.1)
    }
  }, [glasses])
  return <primitive object={glasses} scale={35} />
}

export default Glasses
