// ACTION TYPE CREATOR
const LOAD_ALL_SONGS = "song/loadAllSongs";
const CLEAR_RESTAURANTS = "song/clearSongs";


//ACTION CREATORS
export const loadAllSongs = (songs) => {
    return {
        type: LOAD_ALL_SONGS,
        songs
    }
}

export const clearSongs = () => {
    return {
        type: CLEAR_RESTAURANTS
    };
};


//ACTION THUNK CREATORS
export const fetchAllSongs = () => async (dispatch) => {
    const response = await fetch("/api/songs");
    const songs = await response.json();
    dispatch(loadAllSongs(songs))
}

//REDUCER
const songReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_SONGS: {
            const songsState = {}
            action.songs.songs.forEach((song) => (
                songsState[song.id] = song
            ))
            return songsState
        }
        case CLEAR_RESTAURANTS:
            return {};
        default:
            return state
    }
}


export default songReducer
