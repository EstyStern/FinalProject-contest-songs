import produce from 'immer';

const StepInPlanInitialState = {
    StepInPlans: [],
    CurrentStepInPlanId: {},
    StepsToAdd: [],
    StepsToUpadte: []
}

export const StepInPlanReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_STEP_IN_PLANS':
            {
                state.StepInPlans = action.payload;
                break;
            }
        case 'GET_CURRENT_STEP':
            {
                debugger
                console.log("action", action);
                state.CurrentStepInPlanId = action.payload;
                break;
            }
        case 'STEP_ADD_TO_STORE':
            {
                debugger
                state.StepsToAdd.push(action.payload);
                break;
            }
        case 'STEP_UPDATE_TO_STORE':
            {
                debugger
                console.log("action", action);
                state.StepsToUpadte.push(action.payload);
                break;
            }
        case 'ADD_STEPS':
            {
                debugger
                console.log("action", action);
                state.StepsToUpadte=action.payload;
                break;
            }
        case 'UPDATE_STEPS':
            {
                debugger
                console.log("action", action);
                state.StepsToUpadte=action.payload;
                break;
            }
    }
}, StepInPlanInitialState)