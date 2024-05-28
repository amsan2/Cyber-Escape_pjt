import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

const Portrait = ({ isTwoMinLater, isFiveMinLater }: PortraitProps) => {
  // 일반 초상화
  const portrait = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/before_portrait.glb",
    true,
  )

  // 무서운 버전 초상화
  const horrorPortrait = useGLTF(
    process.env.NEXT_PUBLIC_IMAGE_URL + "/glb/horror/after_portrait.glb",
    true,
  )

  // 초기 위치 설정
  useEffect(() => {
    if (portrait.scene && horrorPortrait.scene) {
      portrait.scene.position.set(-8, 0, 0)
      horrorPortrait.scene.position.set(-8, 0, 0)
    }
  }, [portrait, horrorPortrait])

  // props에 따른 position, rotation, scale 변경

  let horrorPortraitScale = 35 // 초기 scale

  useEffect(() => {
    if (isFiveMinLater) {
      horrorPortrait.scene.position.set(15, 105, -132)
      horrorPortrait.scene.rotation.set(3, 0, 0)
      horrorPortraitScale = 45
    }
  }, [isFiveMinLater])

  return (
    <>
      {isTwoMinLater ? (
        <primitive object={horrorPortrait.scene} scale={horrorPortraitScale} />
      ) : (
        <primitive object={portrait.scene} scale={35} />
      )}
    </>
  )
}

export default Portrait
