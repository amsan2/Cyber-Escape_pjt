import styled from "styled-components"
import { Badge } from "@mui/material"

// 상단 네비게이션 바 item
const HeaderNavItem = ({
  Icon,
  text,
  onClick,
  isFriendAlram,
  isNotificationAlram,
}: HeaderNavItemProps) => (
  <Box onClick={onClick}>
    <IconBox>
      {(isFriendAlram && text === "친구") ||
      (isNotificationAlram && text === "알림") ? (
        <Badge variant="dot" color="error">
          <Icon
            style={{
              color: "white",
              fontSize: "40px",
              cursor: "pointer",
            }}
          />
        </Badge>
      ) : (
        <Icon
          style={{
            color: "white",
            fontSize: "40px",
            cursor: "pointer",
          }}
        />
      )}
    </IconBox>
    <Text
      style={{
        marginRight: text === "홈" || "로그아웃" ? "3px" : "0",
      }}
    >
      {text}
    </Text>
  </Box>
)
export default HeaderNavItem

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`

const Text = styled.div`
  color: white;
  font-size: 20px;
  cursor: pointer;
`

const IconBox = styled.div`
  color: white;
  font-size: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
`
