import { useGLTF } from "@react-three/drei"

const Paper = ({ isTwoMinLater }: TimeProps) => {
  const paperPaths = ["/glb/horror/paper.glb", "/glb/horror/after_paper.glb"]
  const [paper, horrorPaper] = paperPaths
    .map((path) => useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + path, true))
    .map((gltf) => gltf.scene)

  return (
    <>
      {isTwoMinLater ? (
        <primitive object={horrorPaper} scale={35} />
      ) : (
        <primitive object={paper} scale={35} />
      )}
    </>
  )
}

export default Paper
