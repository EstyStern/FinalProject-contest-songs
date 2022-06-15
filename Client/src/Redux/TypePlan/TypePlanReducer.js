import produce from 'immer';

const TypePlanInitialState = {
    TypesPlan: []
}

export const TypePlanReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_TYPE_PLAN':
            {
                state.TypesPlan = action.payload;
                break;
            }
        case 'ADD_TYPE_PLAN':
            {
                state.TypesPlan = action.payload;
                break;
            }
    }
}, TypePlanInitialState)