import { useState, useEffect, useCallback } from "react"
import { OpenVidu, Session, StreamManager, Publisher } from "openvidu-browser"

import axios from "axios"

interface ChatData {
  userName: string
  message: string
}

const APPLICATION_SERVER_URL = "http://localhost:8080/"

const useOpenViduSession = (
  uuid: string,
  setMessage: (data: ChatData[]) => void,
) => {
  const [session, setSession] = useState<Session | undefined>(undefined)
  const [subscribers, setSubscribers] = useState<StreamManager[]>([])
  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >(undefined)
  const [chatData, setChatData] = useState<ChatData[]>([])

  useEffect(() => {
    console.log("Session State:", session)
  }, [session])

  useEffect(() => {
    setMessage(chatData)
  }, [chatData, setMessage])

  useEffect(() => {
    const OV = new OpenVidu()
    const newSession = OV.initSession() // 새 세션을 생성
    setSession(newSession) // 생성된 세션을 상태로 설정

    newSession.on("streamCreated", (event: any) => {
      const subscriber = newSession.subscribe(event.stream, undefined)
      setSubscribers((prev) => [...prev, subscriber])
    })

    newSession.on("streamDestroyed", (event: any) => {
      deleteSubscriber(event.stream.streamManager as StreamManager)
    })

    newSession.on("signal", (event: any) => {
      const userName = JSON.parse(event.from.data).clientData
      const message = event.data
      setChatData((prev) => [...prev, { userName, message }])
    })

    const joinSession = async () => {
      const token = await getToken(uuid)
      await newSession.connect(token, {
        clientData: `참가자${Math.floor(Math.random() * 100 + 1)}`,
      })
      const newPublisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: false,
        publishAudio: true,
        publishVideo: false,
      })
      newSession.publish(newPublisher)
      setMainStreamManager(newPublisher)
      setPublisher(newPublisher)
    }
    const leaveSession = () => {
      // Publisher 스트림 중단
      if (publisher) {
        // 스트림의 오디오 및 비디오 트랙을 중단
        const stream = publisher.stream.getMediaStream()
        stream.getAudioTracks().forEach((track) => track.stop())
        stream.getVideoTracks().forEach((track) => track.stop())

        // OpenVidu 세션에서 발행 중단
        session?.unpublish(publisher)
      }

      // 세션 연결 해제
      if (session) {
        session.disconnect()
      }

      // 상태 리셋, 리디렉션 등
      setSession(undefined)
      setSubscribers([])
      setPublisher(null)
      setMainStreamManager(undefined)
    }

    joinSession()

    return () => {
      leaveSession()
    }
  }, [uuid, setMessage])

  const deleteSubscriber = useCallback((streamManager: StreamManager) => {
    setSubscribers((prev) => prev.filter((s) => s !== streamManager))
  }, [])

  const getToken = async (uuid: string): Promise<string> => {
    const sessionId = await createSession(uuid)
    return createToken(sessionId)
  }

  const createSession = async (uuid: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}voice/session`,
      { roomUuid: uuid },
    )
    return response.data.data.sessionId
  }

  const createToken = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}voice/connection`,
      { sessionId },
    )
    return response.data.data.voiceChatToken
  }

  return { session, subscribers, publisher, mainStreamManager, chatData }
}

export default useOpenViduSession
