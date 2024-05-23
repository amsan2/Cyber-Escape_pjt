import styled from "styled-components"
import Image from "next/image"

export const themeIdx = [1, 4, 7]
const themes = ["공포", "싸피", "우주"]

// 랭킹 조회하는 테마 선택 컴포넌트
const ThemeSelectBox = ({
  activeTheme,
  handleThemeClick,
  justifyContent,
  paddingRight,
}: ThemeSelectBoxProps) => {
  return (
    <ThemeMainBox $justifyContent={justifyContent} $paddingRight={paddingRight}>
      {themes.map((theme, index) => (
        <ThemeSubBox key={index} onClick={() => handleThemeClick(index)}>
          <ThemeIcon
            src={
              process.env.NEXT_PUBLIC_IMAGE_URL +
              `/image/${themeIdx[index]}emoticon.png`
            }
            alt={theme}
            width={60}
            height={60}
            $isActive={activeTheme === index}
          />
          <div
            style={{
              fontWeight: activeTheme === index ? "bold" : "normal",
              fontSize: "18px",
            }}
          >
            {theme}
          </div>
        </ThemeSubBox>
      ))}
    </ThemeMainBox>
  )
}

export default ThemeSelectBox

const ThemeMainBox = styled.div<ThemeMainBoxStyleProps>`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: ${(props) => props.$justifyContent};
  padding-right: ${(props) => props.$paddingRight};
`

const ThemeSubBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const ThemeIcon = styled(Image)<ThemeIconStyleProps>`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.$isActive ? "scale(1.2)" : "scale(1)")};
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`
