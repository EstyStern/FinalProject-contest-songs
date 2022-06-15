import produce from 'immer';

const UsersInitialState = {
    Users: [],
    CurrentUser: [],
    IfFromArea: false
}

export const UsersReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_USERS':
            {
                state.Users = action.payload;
                break;
            }
        case 'LOAD_GET_CURRENT_USER':
            {
                state.CurrentUser = action.payload;
                break;
            }
        case 'ADD_USER':
            {
                state.Users = action.payload;
                // state.corentUser = action.payload;
                break;
            }
        case 'IF_FROM_AREA':
            {
                state.IfFromArea = action.payload;
            }
    }
}, UsersInitialState)