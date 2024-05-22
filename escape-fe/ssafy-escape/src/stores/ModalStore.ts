import { create } from "zustand"

interface ModalState {
  isRequestModalOpen: boolean
  isDeleteMode: boolean
}

interface ModalAction {
  setIsRequestModalOpen: (isRequestModalOpen: boolean) => void
  setIsDeleteMode: (isDeleteMode: boolean) => void
  resetModalState: () => void
}

const initialState: ModalState = {
  isRequestModalOpen: false,
  isDeleteMode: false,
}

const useModalStore = create<ModalAction & ModalState>((set) => ({
  ...initialState,
  setIsRequestModalOpen: (isRequestModalOpen: boolean) =>
    set({ isRequestModalOpen }),
  setIsDeleteMode: (isDeleteMode: boolean) => set({ isDeleteMode }),
  resetModalState: () => set(initialState),
}))

export default useModalStore
