import styled from "styled-components"

// 인게임 로딩 텍스트
const LoadingText = ({ isModelLoaded, selectedTheme }: LoadingTextProps) => {
  if (!isModelLoaded) {
    const loadingText = <Text>Now Loading...</Text>
    if ([4, 5, 6].includes(selectedTheme)) {
      return <Text style={{ color: "white" }}>Now Loading...</Text>
    }
    return loadingText
  }
  return null
}

export default LoadingText

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
`
