import axios from "axios"
import { useDispatch } from "react-redux"
import {LoadGetAllMessages} from './MessageActions'

export const defaultURL = `https://localhost:44324/api/Message`

export const GetAllMessageFromServer = async (dispatch) => {
    try {
        const AllMessage = await axios.get(`${defaultURL}/GetAllMessages`);
        await console.log(AllMessage.data)
        await dispatch(LoadGetAllMessages(AllMessage.data))
        return AllMessage.data;
    } catch (e) {
        console.log(e)
    }
}