import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { Mesh } from "three"

const SsafyOffice = ({ onLoaded }: RoomProps) => {
  const { scene: SsafyOffice } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/ssafy2/office.glb",
    true,
  )

  useEffect(() => {
    if (SsafyOffice) {
      SsafyOffice.renderOrder = 0
      SsafyOffice.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      onLoaded(true)
    }
  }, [SsafyOffice, onLoaded])

  return <primitive object={SsafyOffice} scale={10} />
}

export default SsafyOffice
