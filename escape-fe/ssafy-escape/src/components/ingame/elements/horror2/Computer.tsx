import { useGLTF } from "@react-three/drei"

const Computer = ({ onClick, setInteractNum, solved }: FinalProps) => {
  const computer = useGLTF("/glb/horror2/computer.glb", true)
  const handlePointerOver = () => {
    if (solved === 0) {
      setInteractNum(2)
    }
  }
  return (
    <primitive
      object={computer.scene}
      scale={35}
      onPointerOver={handlePointerOver}
      onPointerOut={() => setInteractNum(1)}
      onClick={() => onClick()}
    />
  )
}

export default Computer
