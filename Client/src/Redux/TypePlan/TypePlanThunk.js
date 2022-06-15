import axios from "axios"
import {LoadGetAllTypePlan,LoadAddTypePlan} from './TypePlanActions'


export const defaultURL = `https://localhost:44324/api/TypePlan`

export const GetAllTypePlanFromServer = async (dispatch) => {
    try {
        const AllTypePlan = await axios.get(`${defaultURL}/GetAllTypePlans`);
        await console.log(AllTypePlan.data)
        await dispatch(LoadGetAllTypePlan(AllTypePlan.data))
        return AllTypePlan.data;
    } catch (e) {
        console.log(e)
    }
}


export const AddTypePlan= async (dispatch, t) => {
    debugger
    try {
        debugger
        console.log(t);
        const allTypePlanAfterAdding = await axios.post(`${defaultURL}/AddTypePlan`,t);
        debugger
        await console.log("all",allTypePlanAfterAdding.data)
        await dispatch(LoadAddTypePlan(allTypePlanAfterAdding.data))
        return allTypePlanAfterAdding.data;
        // return t
    } catch (e) {
        console.log(e)
    }
}