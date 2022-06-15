export function LoadGetAllUsers(items) {
    debugger
    console.log(items)
    return { type: "LOAD_GET_ALL_USERS", payload: items }
}

export function LoadGetCurrentUser(items) {
    debugger
    console.log(items)
    return { type: "LOAD_GET_CURRENT_USER", payload: items }
}

export function AddUser(items){
    debugger
    console.log(items)
    return {type:"ADD_USER",payload:items}
}

export function IfFromArea(item) {
    return { type: "IF_FROM_AREA", payload: item };
}