export function LoadGetAllSongs(items){
    debugger
    console.log(items)
    return {type:"LOAD_GET_ALL_SONGS",payload:items}
}
export function AddSong(items){
    debugger
    console.log(items)
    return {type:"ADD_SONG",payload:items}
}