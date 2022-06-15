import axios from "axios"
import { LoadGetAllPlans, LoadAddPlan, LoadUpdateMyPlan,LoadCalcWins } from "./PlanActions"

export const defaultURL = `https://localhost:44324/api/Plan`

export const GetAllPlansFromServer = async (dispatch) => {
    try {
        const AllPlans = await axios.get(`${defaultURL}/GetAllPlans`);
        await console.log(AllPlans.data)
        await dispatch(LoadGetAllPlans(AllPlans.data))
        return AllPlans.data;
    } catch (e) {
        console.log(e)
    }
}

export const AddPlan = async (dispatch, p) => {
    debugger
    try {
        debugger
        console.log(p);
        const allPlansAfterAdding = await axios.post(`${defaultURL}/AddPlan`, p);
        await console.log("all", allPlansAfterAdding.data)
        debugger
        await dispatch(LoadAddPlan(allPlansAfterAdding.data))
        return allPlansAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}

export const UpdatePlan = async (dispatch, p) => {
    try {
        debugger
        const PlanToUpdate = await axios.put(`${defaultURL}/UpdatePlan`, p);
        await console.log(PlanToUpdate.data)
        await dispatch(LoadUpdateMyPlan(PlanToUpdate.data))
        return PlanToUpdate.data;
    } catch (e) {
        console.log(e)
    }

}

export const GetWinsInPlanFromServer = async (dispatch,songsPerPlan) => {
    try {
        debugger
        const AllWinsInPlan = await axios.post(`https://localhost:44324/api/Song/GetWinsInPlan`,songsPerPlan);
        await console.log(AllWinsInPlan.data)
        await dispatch(LoadCalcWins(AllWinsInPlan.data))
        return AllWinsInPlan.data;
    } catch (e) {
        console.log(e)
    }
}