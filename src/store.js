import { create } from 'zustand'

export const useModalStore = create((set) => ({
    openEditModal: false,
    modalData: null,
    setModalData: (data) => set({ modalData: data }),
    setOpenEditModal: () => set((state) => ({ openEditModal: !state.openEditModal })),
}))



export const sidebarStore = create((set) => ({
    openSidebar: false,
    setOpenSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
}))
