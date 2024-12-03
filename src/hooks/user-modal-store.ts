import { User } from "@/types";
import { create } from "zustand";

interface createUserModalStore {
    data: User | null;
    isOpen: boolean;
    onOpen: (data: User | null) => void;
    onClose: () => void;
}

export const useUserModal = create<createUserModalStore>((set) => (
    {
        isOpen: false,
        data: null,
        onOpen: (data: User | null) => set({ isOpen: true, data }),
        onClose : ()=>set({isOpen:false,data:null})
    }
))