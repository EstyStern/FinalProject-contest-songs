import axios from "axios"
import { LoadGetAllPlans } from "./SongActions"
import { LoadGetAllSongs,AddSong } from "./SongActions"

export const defaultURL = `https://localhost:44324/api/Song`

export const GetAllSongsFromServer = async (dispatch) => {
    try {
        const AllSongs = await axios.get(`${defaultURL}/GetAllSongs`);
        await console.log(AllSongs.data)
        await dispatch(LoadGetAllSongs(AllSongs.data))
        return AllSongs.data;
    } catch (e) {
        console.log(e)
    }
}

export const AddSongFromServer= async (dispatch, getState, s) => {
    try {
        debugger
        console.log(s);
        const allSongsAfterAdding = await axios.post(`${defaultURL}/AddSong`,s);
        await console.log("all",allSongsAfterAdding.data)
        await dispatch(AddSong(allSongsAfterAdding.data))
        return allSongsAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}