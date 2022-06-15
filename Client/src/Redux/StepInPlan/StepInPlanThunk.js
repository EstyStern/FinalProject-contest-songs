import axios from "axios"
import { useDispatch } from "react-redux"
import {LoadGetAllStepInPlans,LoadAddSteps,LoadUpdateSteps} from './StepInPlanActions'

export const defaultURL = `https://localhost:44324/api/StepInPlan`

export const GetAllStepInPlanFromServer = async (dispatch) => {
    try {
        const AllStepInPlans = await axios.get(`${defaultURL}/GetAllStepInPlans`);
        await console.log(AllStepInPlans.data)
        await dispatch(LoadGetAllStepInPlans(AllStepInPlans.data))
        return AllStepInPlans.data;
    } catch (e) {
        console.log(e)
    }
}

export const AddSteps = async (dispatch, s) => {
    debugger
    try {
        debugger
        console.log(s);
        const allStepsAfterAdding = await axios.post(`${defaultURL}/AddSteps`, s);
        await console.log("all", allStepsAfterAdding.data)
        debugger
        await dispatch(LoadAddSteps(allStepsAfterAdding.data))
        return allStepsAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}

export const UpdateSteps = async (dispatch, s) => {
    try {
        debugger
        const StepsToUpdate = await axios.put(`${defaultURL}/UpdateSteps`, s);
        await console.log(StepsToUpdate.data)
        await dispatch(LoadUpdateSteps(StepsToUpdate.data))
        return StepsToUpdate.data;
    } catch (e) {
        console.log(e)
    }
}