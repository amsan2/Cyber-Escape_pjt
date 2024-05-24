import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import styled from "styled-components"
import Crosshair from "./Crosshair"

const BasicScene = ({
  interactNum,
  children,
  mouseSpeed,
}: BasicSceneProps) => {
  const [isPointerLocked, setIsPointerLocked] = useState(false)

  const controlsRef = useRef<any>()

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
      <Canvas shadows camera={{ fov: 50 }}>
        <Physics gravity={[0, -9.8, 0]}>{children}</Physics>
        <PointerLockControls ref={controlsRef} pointerSpeed={mouseSpeed} />
      </Canvas>
      <FullScreenOverlay onClick={handlePointerLock}></FullScreenOverlay>
      {isPointerLocked && <Crosshair interactNum={interactNum} />}
    </div>
  )
}

export default BasicScene

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: cursor;
  z-index: 0;
`