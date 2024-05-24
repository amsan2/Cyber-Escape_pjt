import { useEffect, useState } from "react"
import styled from "styled-components"

const BlackOut = ({ penalty }: PenaltyProps) => {
  const [showBlackOut, setShowBlackOut] = useState<boolean>(false)

  useEffect(() => {
    if (penalty === 1) {
      setShowBlackOut(true)
      setTimeout(() => {
        setTimeout(() => {
          setShowBlackOut(false)
        }, 2000)
      }, 2000)
    }
  }, [penalty])

  return showBlackOut && <BlackBackground></BlackBackground>
}

export default BlackOut

const BlackBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 24;
`
