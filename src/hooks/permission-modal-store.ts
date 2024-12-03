import { Permission } from "@/types";
import { create } from "zustand";

interface createPermissionModalStore {
    data: Permission | null;
    isOpen: boolean;
    onOpen: (data: Permission | null) => void;
    onClose: () => void;
}

export const usePermissionModal = create<createPermissionModalStore>((set) => (
    {
        isOpen: false,
        data: null,
        onOpen: (data: Permission | null) => set({ isOpen: true, data }),
        onClose : ()=>set({isOpen:false,data:null})
    }
))