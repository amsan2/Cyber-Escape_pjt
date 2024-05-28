import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

const VoodooDoll = ({ solved }: SolvedObjectProps) => {
  const voodooDollPaths = [
    "/glb/horror/voodoo_doll.glb",
    "/glb/horror/pool_blood1.glb",
  ]
  const [voodooDoll, bloodPool1] = voodooDollPaths
    .map((path) => useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + path, true))
    .map((gltf) => gltf.scene)

  useEffect(() => {
    if (voodooDoll && bloodPool1) {
      voodooDoll.position.set(40, 13, -40)
      bloodPool1.position.set(28, 11.5, -52)
    }
  }, [voodooDoll, bloodPool1, solved])

  return (
    solved === 3 && (
      <>
        <primitive object={voodooDoll} scale={1} />
        <primitive object={bloodPool1} scale={500} />
      </>
    )
  )
}

export default VoodooDoll
