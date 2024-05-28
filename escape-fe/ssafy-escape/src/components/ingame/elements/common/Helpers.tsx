import { useState, useEffect } from "react"

interface Movement {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
}

export const usePlayerControls = () => {
  const keys: { [key: string]: keyof Movement } = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
  }
  const moveFieldByKey = (key: string): keyof Movement => keys[key]

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = (e: KeyboardEvent) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return movement
}
