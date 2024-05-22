// 알림 목록 중 게임방 초대 알림만 가져오도록 필터링
const FilterGameInvitations = (
  notifications: GetNotificationListDataProps[],
) => {
  return notifications.filter((data) => data.type === "GAME")
}

export default FilterGameInvitations
