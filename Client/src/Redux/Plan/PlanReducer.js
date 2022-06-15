import produce from 'immer';

const PlanInitialState = {
    Plans: [],
    PlanToUpdate: [],
    PlanToAdd: [],
    PlansToShow: [],
    Wins:[]
}

export const PlanReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_PLANS':
            {
                state.Plans = action.payload;
                break;
            }
        case 'ADD_PLAN':
            {
                state.Plans = action.payload;
                break;
            }
        case 'UPDATE_PLAN':
            {
                state.Plans = action.payload;
                break;
            }
        case 'UPDATE_PLAN_FROM_STORE':
            {
                state.PlanToUpdate = action.payload;
                break;
            }
        case 'ADD_PLAN_FROM_STORE':
            {
                state.PlanToAdd = action.payload;
                break;
            }
        case 'SAVE_ALL_PLANS_TO_SHWO':
            {
                state.PlansToShow = action.payload;
                break;
            }
        case 'WINS_FROM_STORE':
            {
                state.Wins = action.payload;
                break;
            }

    }
}, PlanInitialState)