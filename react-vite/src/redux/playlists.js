//ACTION TYPE CREATOR
const LOAD_ALL_PLAYLISTS = "playlist/loadAllPlaylists"
const ADD_NEW_PLAYLIST = "playlist/loadNewPlaylist"
const LOAD_PLAYLIST = "playlist/loadPlaylist"
const DELETE_PLAYLIST = "playlist/deletePlaylist"
const LOAD_SONG_TO_PLAYLIST = "playlist/loadSongToPlaylist"
const REMOVE_SONG_FROM_PLAYLIST = "playlist/removeSongFromPlaylist"
const CLEAR_PLAYLIST_SONGS = "playlist/clearPlaylistSongs"


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

export const loadSongToPlaylist = (newAdd) => {
    return {
        type: LOAD_SONG_TO_PLAYLIST,
        newAdd
    }
}

export const removeSongFromPlaylist = (song_id, playlist_id) => {
    return {
        type: REMOVE_SONG_FROM_PLAYLIST,
        action: {
            song_id,
            playlist_id
        }
    }
}

export const clearSongPlaylists = (obj) => {
    return {
        type: CLEAR_PLAYLIST_SONGS,
        obj
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
        const playlist = await response.json();
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

export const addSongToPlaylist = (song_id, playlist_id) => async (dispatch) => {
    const response = await fetch("/api/playlists/new-song", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "song_id": song_id, "playlist_id": playlist_id })
    })

    if (response.ok) {
        const newAdd = response.json()
        dispatch(loadSongToPlaylist(newAdd))
        return (newAdd)
    } else {
        console.log("Something went wrong in the thunk")
    }
}

export const fetchSongPlaylistRemover = (song_id, playlist_id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlist_id}/song`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            song_id
        })
    })

    if (response.ok) {
        dispatch(removeSongFromPlaylist(song_id, playlist_id))
        return ({
            "Message": "Successfully Removed Song from Playlist"
        })
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
            console.log("LOOK HERE PLEASE", action.playlist)
            const newPlaylist = { ...state.playlists, [action.playlist.id]: action.playlist }
            return { ...state, playlists: newPlaylist }
        case DELETE_PLAYLIST: {
            const currPlaylist = { ...state.playlists }
            delete currPlaylist[action.playlist_id]
            return { ...state, playlists: currPlaylist }
        }
        case LOAD_SONG_TO_PLAYLIST: {
            const { playlist_id, song_id } = action.newAdd;
            const playlist = state.playlists[playlist_id]

            const updatedPlaylist = { ...playlist, songs: [...playlist.songs, song] }
            const updatedPlaylists = {
                ...state,
                playlists: updatedPlaylist
            }
            return { ...state, playlists: updatedPlaylists }
        }
        case REMOVE_SONG_FROM_PLAYLIST: {
            const { song_id, playlist_id } = action.action
            const playlist = state.playlists[playlist_id]
            const newSongs = playlist.songs.filter((song) => song.id !== song_id)

            const updatedPlaylist = { ...playlist, songs: newSongs }

            const updatedPlaylists = {
                ...state.playlists,
                [playlist_id]: updatedPlaylist
            }

            return {
                ...state,
                playlists: updatedPlaylists
            }
        }
        default:
            return state
    }
}

export default playlistReducer
