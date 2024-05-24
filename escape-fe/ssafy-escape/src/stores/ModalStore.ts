import { create } from "zustand"

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
