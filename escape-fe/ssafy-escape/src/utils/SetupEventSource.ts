import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill"

interface SetupEventSourceProps {
  accessToken: string
  setIsFriendAlram: (isFriendAlram: boolean) => void
  setIsNotificationAlram: (isNotificationAlram: boolean) => void
}

// SSE 구독 설정
const SetupEventSource = ({
  accessToken,
  setIsFriendAlram,
  setIsNotificationAlram,
}: SetupEventSourceProps) => {

  // EventSource 인스턴스 생성
  const EventSource = EventSourcePolyfill || NativeEventSource
  let eventSource = new EventSource(
    `${process.env.NEXT_PUBLIC_URL}/notify/subscribe`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
      heartbeatTimeout: 1000 * 60 * 5,
    },
  )

  // SSE 이벤트 리스너 추가
  eventSource.addEventListener("sse", (event) => {
    const messageEvent = event as MessageEvent
    let parsedData: any

    // messageEvent.data가 json형태면(알림) 파싱해서, 아니면(string -> 구독 메세지) 그대로 받음
    try {
      parsedData = JSON.parse(messageEvent.data)
    } catch {
      parsedData = messageEvent.data
    }

    // 해당하는 타입의 알림 하나라도 있을 경우 각각 알림 도착 ui 표시
    if (parsedData && typeof parsedData === "object" && "type" in parsedData) {
      if (parsedData.type === "FRIEND") {
        setIsFriendAlram(true)
      } else if (parsedData.type === "GAME") {
        setIsNotificationAlram(true)
      }
    }
  })

  // 에러 발생 시마다 재연결 시도
  let retryCount = 0 // 재연결 시도 횟수
  eventSource.addEventListener("error", () => {
    retryCount++
    if (retryCount >= 3) {
      eventSource.close()
      return
    }

    setTimeout(() => {
      eventSource.close()
      SetupEventSource({
        accessToken,
        setIsFriendAlram,
        setIsNotificationAlram,
      })
    }, 3000)
  })

  return () => eventSource.close()
}

export default SetupEventSource
