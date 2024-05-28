import { useGLTF } from "@react-three/drei"

const Art = ({ isTwoMinLater }: TimeProps) => {
  const artPaths = [
    "/glb/horror/art.glb",
    "/glb/horror/art2.glb",
    "/glb/horror/after_art.glb",
    "/glb/horror/after_art2.glb",
  ]

  const [art, art2, horrorArt, horrorArt2] = artPaths
    .map((path) => useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + path, true))
    .map((gltf) => gltf.scene)

  return (
    <>
      {isTwoMinLater ? (
        <>
          <primitive object={horrorArt} scale={35} />
          <primitive object={horrorArt2} scale={35} />
        </>
      ) : (
        <>
          <primitive object={art} scale={35} />
          <primitive object={art2} scale={35} />
        </>
      )}
    </>
  )
}

export default Art
