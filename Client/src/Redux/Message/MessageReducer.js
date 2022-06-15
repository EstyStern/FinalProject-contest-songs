import produce from 'immer';

const MessageInitialState = {
    Message: []
}

export const MessageReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_MESSAGES':
            {
                state.Message = action.payload;
                break;
            }
    }
}, MessageInitialState)