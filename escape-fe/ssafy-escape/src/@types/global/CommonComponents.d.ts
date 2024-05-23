interface ButtonProps {
  theme: "success" | "fail" | "game"
  text?: string
  width?: string
  height?: string
  fontSize?: string
  backgroundColor?: string
  opacity?: string
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
}

interface ContainerProps {
  children: ReactNode
  isBackButton?: boolean // 뒤로 가기 버튼 유무
  $display?: string
  $flexDirection?: string
  $justifyContent?: string
  $alignItems?: string
  $backgroundColor?: string
  $gap?: string
}

interface InputProps {
  $width?: string
  $textIndent?: string
}

interface MainModalProps {
  children: ReactNode
  text: string // 최상단 중앙의 제목 내용
  isOpen: boolean
  onClose: () => void
  isFriendModal?: boolean // 친구 관련 모달인지 여부
  width?: string
  height?: string
}

interface MainModalStyleProps {
  $width?: string
  $height?: string
}

interface HeaderNavItemProps {
  Icon: React.ElementType
  text: string
  onClick: () => void
  isFriendAlram: boolean
  isNotificationAlram: boolean
}

interface ThemeSelectBoxProps {
  activeTheme: number
  handleThemeClick: (idx: number) => void
  justifyContent?: string
  paddingRight?: string
}

interface ThemeIconStyleProps {
  $isActive: boolean
}

interface ThemeMainBoxStyleProps {
  $justifyContent?: string
  $paddingRight?: string
}
