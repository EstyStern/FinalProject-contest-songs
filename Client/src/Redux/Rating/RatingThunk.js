import axios from "axios"
import { LoadGetAllRating, LoadGetAllRatingByIdSong } from './RatingActions'

export const defaultURL = `https://localhost:44324/api/Rating`

export const GetAllRatingFromServer = async (dispatch) => {
    try {
        const AllRating = await axios.get(`${defaultURL}/GetAllRatings`);
        await console.log(AllRating.data)
        await dispatch(LoadGetAllRating(AllRating.data))
        return AllRating.data;
    } catch (e) {
        console.log(e)
    }
}

export const GetAllRatingByIdSongFromServer = async (dispatch, IdSong) => {
    try {
        const AllRating = await axios.get(`${defaultURL}/GetAllRatingsByIdSong/${IdSong}`);
        await console.log(AllRating.data)
        await dispatch(LoadGetAllRatingByIdSong(AllRating.data))
        return AllRating.data;
    } catch (e) {
        console.log(e)
    }
}

export const AddRaiting = async (dispatch, raiting) => {
    debugger
    try {
        debugger
        console.log(raiting);
        const allRaitingAfterAdding = await axios.post(`${defaultURL}/AddRating`, raiting);
        await console.log("all", allRaitingAfterAdding.data)
        await dispatch(AddRaiting(allRaitingAfterAdding.data))
        return allRaitingAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}

export const IfThisUserRatingThisSong = async (song, user) => {
    debugger
    try {
        debugger
        const IfOk = await axios.get(`${defaultURL}/ReturnIfThisUserRatingThisSong/${song}/${user}`);
        await console.log(IfOk.data)
        return IfOk.data;
    } catch (e) {
        console.log(e)
    }
}

export const IfThisUserRatingSongs = async (song, user) => {
    debugger
    try {
        console.log(song, "song");
        console.log(user, "user");
        debugger
        let IfOk = await axios.get(`${defaultURL}/ReturnIfThisUserRatingSongs/${user}`,song);
        await console.log(IfOk.data)
        return IfOk.data;
    } catch (e) {
        console.log(e)
    }
}