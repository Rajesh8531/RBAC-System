import { FullDataType } from "@/types"
import { getItem } from "@/utils"

export const getUsersByStatus = () => {
    const RBAC_DATA = getItem('rbac_data') as FullDataType
    const users = RBAC_DATA?.users || []
    if (users.length == 0) {
        return []
    }
    const activeUserCount = RBAC_DATA?.users.filter(item => item.isActive).length
    const inActiveUserCount = RBAC_DATA?.users.length - activeUserCount
    return [
        {
            status: "Active",
            count : activeUserCount
        },
        {
            status: "InActive",
            count : inActiveUserCount
        }
    ]
}

export const getUsersByRole = () => {
    const RBAC_DATA = getItem('rbac_data') as FullDataType
    const users = RBAC_DATA?.users || []
    if (users.length == 0) {
        return []
    }
    const users_data : {status:string,count:number}[] = []
    for (const role of RBAC_DATA.roles) {
        const count = users.filter(user => user.role == role.id).length
        users_data.push({status:role.name,count}) 
    }
    
    return users_data
}