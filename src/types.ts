
export interface Permission {
    id: string;
    name: string;
}

export interface Role {
    id: string;
    name: string;
    permissions : string[]
}

export interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    isActive: boolean;
}

export interface FullDataType {
    roles: Role[];
    users: User[];
    permissions : Permission[]
}

export const initialData = {}
