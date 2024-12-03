import {  Role } from "@/types";
import { create } from "zustand";

interface createRoleModalStore {
    data: Role | null;
    isOpen: boolean;
    onOpen: (data: Role | null) => void;
    onClose: () => void;
}

export const useRoleModal = create<createRoleModalStore>((set) => (
    {
        isOpen: false,
        data: null,
        onOpen: (data: Role | null) => set({ isOpen: true, data }),
        onClose : ()=>set({isOpen:false,data:null})
    }
))