export function LoadGetAllSingers(items){
    debugger
    console.log(items)
    return {type:"LOAD_GET_ALL_SINGERS",payload:items}
}

export function UpdateSinger(item) {
    return { type: "UPDATE_SINGER", paylod: item };
}

export function WaitForOk(item) {
    return { type: "WAIT_OK", paylod: item };
}

// export function IfFromArea(item) {
//     return { type: "IF_FROM_AREA", payload: item };
// }