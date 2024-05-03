//ACTION TYPE CREATOR
const LOAD_ALL_SONGS_PLAYLIST = "playlist/allPlaylistSongs"
const LOAD_SONG_TO_PLAYLIST = "playlist/loadSongToPlaylist"
const REMOVE_SONG_FROM_PLAYLIST = "playlist/removeSongFromPlaylist"
const CLEAR_PLAYLIST_SONGS = "playlist/clearPlaylistSongs"

//ACTION CREATORS
export const loadAllPlaylistSongs = (songs) => {
    return {
        type: LOAD_ALL_SONGS_PLAYLIST,
        songs
    }
}

export const loadSongToPlaylist = (song) => {
    return {
        type: LOAD_SONG_TO_PLAYLIST,
        song
    }
}

export const removeSongFromPlaylist = (songPlaylist_id) => {
    return {
        type: REMOVE_SONG_FROM_PLAYLIST,
        songPlaylist_id
    }
}

export const clearSongPlaylists = (obj) => {
    return {
        type: CLEAR_PLAYLIST_SONGS,
        obj
    }
}

//ACTION THUNKS
export const fetchAllPlaylistSongs = () => async (dispatch) => {
    const response = await fetch("/api/playlists/all-songs");

    if (response.ok) {
        const songs = await response.json();
        dispatch(loadAllPlaylistSongs(songs))
    } else {
        console.log("THUNK FAILED")
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
        const { newAdd } = response.json()
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
        const responseObj = response.json();
        const songPlaylist_Id = responseObj["songPlaylist_id"]
        dispatch(removeSongFromPlaylist(songPlaylist_Id))
        return ({
            "Message": "Successfully Removed Song from Playlist"
        })
    } else {
        console.log("SOMETHING WENT WRONG IN THE THUNK")
    }
}

const songPlaylistReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_SONGS_PLAYLIST: {
            const songsState = {}
            console.log("LOOK HERE", action.songs[0])
            action.songs.forEach((song) => {
                songsState[song.id] = song
            })
            return { ...songsState }
        }
        case LOAD_SONG_TO_PLAYLIST: {
            const newSong = {}
            newSong[action.song["song_id"]] = action.song
            return { ...state, newSong }
        }
        case REMOVE_SONG_FROM_PLAYLIST: {
            const currState = { ...state }
            delete currState[action.songPlaylist_Id]
            return currState
        }
        case CLEAR_PLAYLIST_SONGS:
            return {}
        default:
            return state
    }
}

export default songPlaylistReducer
