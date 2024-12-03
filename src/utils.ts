export const setItem = (name: string, data: any) => {
    localStorage.setItem(name,JSON.stringify(data))
}

export const getItem = (name: string) => {
    return JSON.parse(localStorage.getItem(name)!)
}