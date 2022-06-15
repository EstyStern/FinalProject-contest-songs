import produce from 'immer';

const SingersInitialState = {
    Singers: [],
    listSingerWaitForOk: []
//     IfFromArea: false
}

export const SingerReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_SINGERS':
            {
                state.Singers = action.payload;
                break;
            }
        case 'UPDATE_SINGER':
            {
                state.Singers = action.paylod;
                break;
            }
        case 'WAIT_OK':
            {
                state.listSingerWaitForOk.push(action.paylod);
            }
        // case 'IF_FROM_AREA':
        //     {
        //         state.IfFromArea=action.payload;
        //     }
    }
}, SingersInitialState)