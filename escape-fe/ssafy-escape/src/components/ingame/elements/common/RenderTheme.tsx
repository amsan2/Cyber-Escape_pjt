import SpaceTheme from "@/components/ingame/main/space/SpaceTheme"
import HorrorTheme from "@/components/ingame/main/horror/HorrorTheme"
import HorrorTheme2 from "@/components/ingame/main/horror2/HorrorTheme2"
import SsafyTheme from "@/components/ingame/main/ssafy/SsafyTheme"
import SsafyTheme2 from "@/components/ingame/main/ssafy2/SsafyTheme2"

// 테마에 따른 컴포넌트 선택 함수
const RenderTheme = ({
  selectedTheme,
  setIsModelLoaded,
  isGameStart,
}: RenderThemeProps) => {
  switch (selectedTheme) {
    case 1:
    case 2:
      return (
        <HorrorTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      )
    case 3:
      return (
        <HorrorTheme2
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      )
    case 4:
    case 5:
      return (
        <SsafyTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      )
    case 6:
      return (
        <SsafyTheme2
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      )
    case 7:
      return (
        <SpaceTheme
          setIsModelLoaded={setIsModelLoaded}
          isGameStart={isGameStart}
        />
      )
    default:
      return null
  }
}

export default RenderTheme
