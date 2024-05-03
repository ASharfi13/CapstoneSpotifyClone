//ACTION TYPE CREATOR

const LOAD_ALL_PLAYLISTS = "playlist/loadAllPlaylists"
const ADD_NEW_PLAYLIST = "playlist/loadNewPlaylist"
const LOAD_PLAYLIST = "playlist/loadPlaylist"
const DELETE_PLAYLIST = "playlist/deletePlaylist"


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
        action: {
            playlist
        }
    }
}

export const loadPlaylist = (playlist) => {
    return {
        type: LOAD_PLAYLIST,
        playlist
    }
}

export const deletePlaylist = (playlist_id) => {
    return {
        type: DELETE_PLAYLIST,
        playlist_id
    }
}



//ACTION THUNK CREATORS
export const fetchAllPlaylists = () => async (dispatch) => {
    const response = await fetch('/api/playlists/');

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

export const fetchPlaylist = (playlist_id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlist_id}`)

    if (response.ok) {
        const playlist = await response.json()
        dispatch(loadPlaylist(playlist))
        return playlist
    } else {
        console.log('SOMETHING WENT WRONG IN THE THUNK')
    }
}

export const fetchDeletePlaylist = (playlist_id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlist_id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deletePlaylist(playlist_id))
        return playlist_id
    } else {
        console.log("SOMETHING WENT WRONG IN THE THUNK")
    }
}

const initialState = {
    "playlists": {},
    "currPlaylist": {}
}


//ACTION REDUCER
const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_PLAYLISTS: {
            const playlistState = {}
            action.playlists.playlists.forEach((playlist) => {
                playlistState[playlist.id] = playlist
            })
            return { ...state, playlists: playlistState }
        }
        case LOAD_PLAYLIST: {
            const currPlaylist = { [action.playlist.id]: action.playlist }
            return { ...state, currPlaylist: { ...currPlaylist } }
        }
        case ADD_NEW_PLAYLIST:
            const newPlaylist = { ...state.playlists, [action.playlist.id]: action.playlist }
            return { ...state, playlists: newPlaylist }
        case DELETE_PLAYLIST: {
            const currPlaylist = { ...state.playlists }
            delete currPlaylist[action.playlist_id]
            return { ...state, playlists: currPlaylist }
        }
        default:
            return state
    }
}

export default playlistReducer
