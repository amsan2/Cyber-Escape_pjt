import { ReactNode, useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import PlayMusic from "./PlayMusic"
import Crosshair from "./Crosshair"
import styled from "styled-components"

interface BasicSceneProps {
  onAir: boolean
  interactNum: number
  children: ReactNode
}

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: cursor;
`

const BasicScene = ({ onAir, interactNum, children }: BasicSceneProps) => {
  const [isPointerLocked, setIsPointerLocked] = useState(false)

  const controlsRef = useRef<any>(null)

  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsPointerLocked(
        document.pointerLockElement === controlsRef.current.domElement,
      )
    }

    document.addEventListener("pointerlockchange", handlePointerLockChange)

    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange)
    }
  }, [])

  const handlePointerLock = () => {
    const element = controlsRef.current.domElement
    element.requestPointerLock()
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* <PlayMusic /> */}
      <Canvas shadows camera={{ fov: 50 }}>
        <Physics gravity={[0, -9.8, 0]}>{children}</Physics>
        <PointerLockControls ref={controlsRef} />
      </Canvas>
      <FullScreenOverlay onClick={handlePointerLock}></FullScreenOverlay>
      {isPointerLocked && <Crosshair interactNum={interactNum} />}
    </div>
  )
}

export default BasicScene
