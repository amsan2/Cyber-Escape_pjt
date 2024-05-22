import { create } from "zustand"
import { persist } from "zustand/middleware"
import postLogin from "../services/user/postLogin"
import postLogout from "../services/user/postLogout"

interface UserState {
  isLogin: boolean
  isHost: boolean
  userUuid: string
  nickname: string
  profileUrl: string
  accessToken: string | null
}

interface UserAction {
  setIsHost: (isHost: boolean) => void
  setNickname: (nickname: string) => void
  setProfileUrl: (profileUrl: string) => void
  setAccessToken: (accessToken: string | null) => void
  login: (loginId: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const initialState: UserState = {
  isLogin: false,
  isHost: false,
  userUuid: null,
  nickname: null,
  profileUrl: undefined,
  accessToken: null,
}

const useUserStore = create<UserAction & UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setIsHost: (isHost) => set({ isHost }),
      setNickname: (nickname) => set({ nickname }),
      setProfileUrl: (profileUrl) => set({ profileUrl }),
      setAccessToken: (accessToken) => set({ accessToken }),

      login: async (loginId: string, password: string) => {
        try {
          const response = await postLogin(loginId, password)

          // 로그인 성공 시 accessToken을 반환
          if (response.accessToken) {
            set({
              isLogin: true,
              userUuid: response.userUuid,
              nickname: response.nickname,
              profileUrl: response.profileUrl,
              accessToken: response.accessToken,
            })
          } else {
            throw new Error("로그인 실패")
          }
        } catch (error) {
          console.error(error)
          throw error
        }
      },

      logout: async () => {
        try {
          await postLogout()
          set(initialState)
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    }),
    {
      name: "user-storage",
    },
  ),
)

export default useUserStore
