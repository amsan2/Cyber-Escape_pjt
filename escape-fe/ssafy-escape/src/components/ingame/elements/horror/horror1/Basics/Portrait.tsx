import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

const Portrait = ({ isTwoMinLater, isFiveMinLater }: TimeProps) => {
  const portraitPaths = [
    "/glb/horror/before_portrait.glb",
    "/glb/horror/after_portrait.glb",
  ]

  const [portrait, horrorPortrait] = portraitPaths
    .map((path) => useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + path, true))
    .map((gltf) => gltf.scene)

  // 초기 위치 설정
  useEffect(() => {
    if (portrait && horrorPortrait) {
      portrait.position.set(-8, 0, 0)
      horrorPortrait.position.set(-8, 0, 0)
    }
  }, [portrait, horrorPortrait])

  // props에 따른 position, rotation, scale 변경

  let horrorPortraitScale = 35 // 초기 scale

  useEffect(() => {
    if (isFiveMinLater) {
      horrorPortrait.position.set(15, 105, -132)
      horrorPortrait.rotation.set(3, 0, 0)
      horrorPortraitScale = 45
    }
  }, [isFiveMinLater])

  return (
    <>
      {isTwoMinLater ? (
        <primitive object={horrorPortrait} scale={horrorPortraitScale} />
      ) : (
        <primitive object={portrait} scale={35} />
      )}
    </>
  )
}

export default Portrait
