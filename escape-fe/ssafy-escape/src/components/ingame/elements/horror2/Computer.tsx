import { useGLTF } from "@react-three/drei"

const Computer = ({ onClick }: ClickObjectProps) => {
  const computer = useGLTF("/glb/horror2/computer.glb", true)
  return (
    <primitive object={computer.scene} scale={35} onClick={() => onClick()} />
  )
}

export default Computer
