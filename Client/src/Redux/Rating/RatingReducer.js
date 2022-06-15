import produce from 'immer';

const RatingInitialState = {
    Rating: [],
    RatingByIdSong: []
}

export const RatingReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_RATING':
            {
                state.Rating = action.payload;
                break;
            }
        case 'ADD_RAITING':
            {
                state.Rating = action.payload;
                break;
            }
        case 'LOAD_GET_ALL_RATING_BY_ID_SONGS':
            {
                state.RatingByIdSong = action.payload;
                break;
            }
    }
}, RatingInitialState)