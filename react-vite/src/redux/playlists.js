//ACTION TYPE CREATOR

const LOAD_ALL_PLAYLISTS = "playlist/loadAllPlaylists"
const ADD_NEW_PLAYLIST = "playlist/loadNewPlaylist"


//ACTION CREATORS
export const loadAllPlaylists = (playlists) => {
    return {
        type: LOAD_ALL_PLAYLISTS,
        playlists
    }
}

export const loadNewPlaylist = (playlist) => {
    return {
        type: ADD_NEW_PLAYLIST,
        playlist
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

export const createNewPlaylist = (newPlaylist) => async (dispatch) => {
    const response = await fetch("/api/playlists/", {
        method: "POST",
        body: newPlaylist
    })

    if (response.ok) {
        const { playlist } = await response.json();
        dispatch(loadNewPlaylist(playlist))
        return playlist
    } else {
        console.log("SOMETHING WENT WRONG IN THE THUNK")
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
        case ADD_NEW_PLAYLIST:
            return { ...state, ...action.playlist }
        default:
            return state
    }
}

export default playlistReducer
