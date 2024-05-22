import { create } from "zustand"

interface IngameQuizState {
  solved: number
  hint: number
}

interface IngameQuizAction {
  setSolved: (solved: number) => void
  setHint: (hint: number) => void
  resetQuizState: () => void
}

const initialState: IngameQuizState = {
  solved: 0,
  hint: 1,
}

const useIngameQuizStore = create<IngameQuizState & IngameQuizAction>(
  (set) => ({
    ...initialState,
    setSolved: (solved: number) => set({ solved }),
    setHint: (hint: number) => set({ hint }),
    resetQuizState: () => {
      set(initialState)
    },
  }),
)

export default useIngameQuizStore
