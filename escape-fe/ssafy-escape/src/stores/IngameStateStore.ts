import { create } from "zustand"

const useIngameStateStore = create<IngameState & IngameAction>((set) => ({
  penalty: 0,
  showFirstProblem: false,
  showSecondProblem: false,
  showThirdProblem: false,
  subtitle: "",
  interactNum: 1,
  result: "",
  clearTime: "",
  isGameFinished: false,
  openHint: false,
  isHintModalOpen: false,
  isSolvedFirstProblem: false,
  isSolvedSecondProblem: false,
  isSolvedThirdProblem: false,
  setIsSolvedFirstProblem: (isSolvedFirstProblem) =>
    set({ isSolvedFirstProblem }),
  setIsSolvedSecondProblem: (isSolvedSecondProblem) =>
    set({ isSolvedSecondProblem }),
  setIsSolvedThirdProblem: (isSolvedThirdProblem) =>
    set({ isSolvedThirdProblem }),
  setOpenHint: (openHint) => set({ openHint }),
  setPenalty: (penalty) => set({ penalty }),
  setShowFirstProblem: (showFirstProblem) => set({ showFirstProblem }),
  setShowSecondProblem: (showSecondProblem) => set({ showSecondProblem }),
  setShowThirdProblem: (showThirdProblem) => set({ showThirdProblem }),
  setSubtitle: (subtitle) => set({ subtitle }),
  setInteractNum: (interactNum) => set({ interactNum }),
  setResult: (result) => set({ result }),
  setClearTime: (clearTime) => set({ clearTime }),
  setIsGameFinished: (isGameFinished) => set({ isGameFinished }),
  setIsHintModalOpen: (isHintModalOpen) => set({ isHintModalOpen }),
}))

export default useIngameStateStore
