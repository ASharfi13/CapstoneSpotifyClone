//ACTION TYPE CREATOR

const LOAD_ALL_PLAYLISTS = "playlist/loadAllPlaylists"


//ACTION CREATORS
export const loadAllPlaylists = (playlists) => {
    return {
        type: LOAD_ALL_PLAYLISTS,
        playlists
    }
}


//ACTION THUNK CREATORS
export const fetchAllPlaylists = () => async (dispatch) => {
    const response = await fetch('/api/playlists');

    if (response.ok) {
        const playlists = await response.json()
        dispatch(loadAllPlaylists(playlists))
        return playlists
    } else {
        console.log("ACTION THUNK FAILED")
    }
}

//ACTION REDUCER
const playlistReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_PLAYLISTS: {
            const playlistState = {}
            action.playlists.playlists.forEach((playlist) => {
                playlistState[playlist.id] = playlist
            })
            return playlistState
        }
        default:
            return state
    }
}

export default playlistReducer
