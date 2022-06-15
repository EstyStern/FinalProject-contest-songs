import axios from "axios"
import { useDispatch } from "react-redux"
import { LoadGetAllJudgForPlans, LoadAddJudge } from './JudgForPlanActions'


export const defaultURL = `https://localhost:44324/api/JudgForPlan`

export const GetAllJudgForPlanFromServer = async (dispatch) => {
    try {
        const AllJudgForPlan = await axios.get(`${defaultURL}/GetAllJudgForPlans`);
        await console.log(AllJudgForPlan.data)
        await dispatch(LoadGetAllJudgForPlans(AllJudgForPlan.data))
        return AllJudgForPlan.data;
    } catch (e) {
        console.log(e)
    }
}
export const AddJudge = async (dispatch, p) => {
    debugger
    try {
        debugger
        console.log(p);
        const allJudgesAfterAdding = await axios.post(`${defaultURL}/AddJudge`, p);
        await console.log("all", allJudgesAfterAdding.data)
        debugger
        await dispatch(LoadAddJudge(allJudgesAfterAdding.data))
        return allJudgesAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}
