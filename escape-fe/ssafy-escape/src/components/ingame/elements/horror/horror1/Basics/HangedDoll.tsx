import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"

const HangedDoll = () => {
  const { scene: doll } = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/hanged_doll.glb",
    true,
  )
  const { scene } = useThree()

  useEffect(() => {
    if (doll) {
      doll.position.set(55, 65, -65)
    }
  }, [doll])

  useEffect(() => {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(2, 3, -1)
    scene.add(light)

    return () => {
      scene.remove(light)
    }
  }, [scene])

  return <primitive object={doll} scale={1} />
}

export default HangedDoll
