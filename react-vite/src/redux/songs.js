import { Form } from "react-router-dom";

// ACTION TYPE CREATOR
const LOAD_ALL_SONGS = "song/loadAllSongs";
const LOAD_SONG = "song/loadSong";
const ADD_NEW_SONG = "song/loadNewSong";
const CLEAR_SONGS = "song/clearSongs";
const UPDATE_SONG = "song/updateSong";
const DELETE_SONG = "song/deleteSong";


//ACTION CREATORS
export const loadAllSongs = (songs) => {
    return {
        type: LOAD_ALL_SONGS,
        songs
    }
}

export const loadSong = (song) => {
    return {
        type: LOAD_SONG,
        song
    }
}

export const loadNewSong = (song) => {
    return {
        type: ADD_NEW_SONG,
        song
    }
}

export const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
        song
    }
}

export const deleteSong = (song_id) => {
    return {
        type: DELETE_SONG,
        song_id
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

export const fetchSong = (song_id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${song_id}`);

    if (response.ok) {
        const song = await response.json()
        dispatch(loadSong(song));
        return song
    } else {
        return "Action Thunk Failed"
    }
}

export const createNewSong = (newSong) => async (dispatch) => {

    const response = await fetch("/api/songs/", {
        method: "POST",
        body: newSong
    })

    if (response.ok) {
        const { song } = await response.json();
        dispatch(loadNewSong(song))
        return song
    } else {
        console.log("Something went wrong in the thunk")
    }
}

export const fetchUpdateSong = (song_id, song) => async (dispatch) => {
    const response = await fetch(`/api/songs/${song_id}`, {
        method: "PUT",
        body: song
    })

    console.log("Look here")

    if (response.ok) {
        const { song } = await response.json()
        dispatch(updateSong(song))
        return song
    } else {
        console.log("Something went wrong in the thunk"), 400
    }
}

export const removeSong = (song_id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${song_id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const song = await response.json()
        dispatch(deleteSong(song))
        return song
    } else {
        console.log("Something went wrong in the thunk"), 400
    }
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
        case LOAD_SONG: {
            return { ...state, [action.song.id]: action.song }
        }
        case ADD_NEW_SONG: {
            return { ...state, [action.song.id]: action.song }
        }
        case UPDATE_SONG: {
            return { ...state, [action.song.id]: action.song }
        }
        case DELETE_SONG: {
            const currState = { ...state }
            delete currState[action.song_id]
            return currState
        }
        case CLEAR_SONGS:
            return {};
        default:
            return state
    }
}


export default songReducer
