import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  selectedTheme: number
  selectedThemeType: "multi" | "single" | null
  roomTitle: string | null
  roomUuid: string | null
}

interface ThemeAction {
  setSelectedTheme: (theme: number) => void
  setSelectedThemeType: (theme: "multi" | "single" | null) => void
  setRoomTitle: (roomTitle: string) => void
  setRoomUuid: (roomUuid: string) => void
}

const initialState: ThemeState = {
  selectedTheme: 1,
  selectedThemeType: null,
  roomTitle: null,
  roomUuid: null,
}

const useIngameThemeStore = create<ThemeAction & ThemeState>()(
  persist(
    (set) => ({
      ...initialState,
      setSelectedThemeType: (selectedThemeType: "multi" | "single" | null) =>
        set({ selectedThemeType }),
      setSelectedTheme: (selectedTheme: number) => set({ selectedTheme }),
      setRoomTitle: (roomTitle: string) => set({ roomTitle }),
      setRoomUuid: (roomUuid: string) => set({ roomUuid }),
    }),
    {
      name: "ingameTheme-storage",
    },
  ),
)

export default useIngameThemeStore
