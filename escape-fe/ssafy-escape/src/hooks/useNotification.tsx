import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import getNotificationList from "@/services/notification/getNotificationList"

const useNotification = () => {
  const [isFriendAlram, setIsFriendAlram] = useState<boolean>(false)
  const [isNotificationAlram, setIsNotificationAlram] = useState<boolean>(false)

  // 알림 도착 여부 확인을 위해 알림 데이터를 불러옴
  const { data: requestData } = useQuery({
    queryKey: ["notificationList"],
    queryFn: () => getNotificationList(),
  })

  useEffect(() => {
    if (requestData) {
      const hasFriendNotification = requestData.some(
        (data) => data.type === "FRIEND",
      )
      const hasGameNotification = requestData.some(
        (data) => data.type === "GAME",
      )

      setIsFriendAlram(hasFriendNotification)
      setIsNotificationAlram(hasGameNotification)
    }
  }, [requestData])

  return {
    isFriendAlram,
    isNotificationAlram,
    setIsFriendAlram,
    setIsNotificationAlram,
  }
}

export default useNotification
