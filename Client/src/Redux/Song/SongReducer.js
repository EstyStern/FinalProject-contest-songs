import produce from 'immer';

const SongInitialState = {
    Songs: [],
}

export const songReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_SONGS':
            {
                state.Songs = action.payload;
                break;
            }
        case 'ADD_SONG':
            {
                state.Songs = action.payload;
                break;
            }    
    }
}, SongInitialState)