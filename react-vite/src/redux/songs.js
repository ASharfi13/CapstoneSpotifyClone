import { Form } from "react-router-dom";

// ACTION TYPE CREATOR
const LOAD_ALL_SONGS = "song/loadAllSongs";
const LOAD_SONG = "song/loadSong";
const ADD_NEW_SONG = "song/loadNewSong";
const CLEAR_SONGS = "song/clearSongs";


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

    console.log("RESPONSE HERE => ", response)

    if (response.ok) {
        const { song } = await response.json();
        console.log("RESULT OF AWAIT RESPONSE.JSON() => ", song)
        dispatch(loadNewSong(song))
        return song
    } else {
        console.log("Something went wrong in the thunk")
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
        case CLEAR_SONGS:
            return {};
        default:
            return state
    }
}


export default songReducer
