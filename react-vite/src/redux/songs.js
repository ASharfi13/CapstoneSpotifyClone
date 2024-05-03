import { Form } from "react-router-dom";

// ACTION TYPE CREATOR
const LOAD_ALL_SONGS = "song/loadAllSongs";
const LOAD_SONG = "song/loadSong";
const ADD_NEW_SONG = "song/loadNewSong";
const CLEAR_SONGS = "song/clearSongs";
const UPDATE_SONG = "song/updateSong";
const DELETE_SONG = "song/deleteSong";
const LOAD_LIKED_SONGS = "song/loadLikedSongs";
const ADD_SONG_TO_LIKES = "song/addSongToLikes";
const REMOVE_SONG_FROM_LIKES = "song/removeSongFromLikes";

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

export const loadLikedSongs = (songs) => {
    return {
        type: LOAD_LIKED_SONGS,
        songs
    }
}

export const removeLikedSong = (song_id) => {
    return {
        type: REMOVE_SONG_FROM_LIKES,
        song_id
    }
}


//ACTION THUNK CREATORS
export const fetchAllSongs = () => async (dispatch) => {
    const response = await fetch("/api/songs");
    if (response.ok) {
        const songs = await response.json();
        dispatch(loadAllSongs(songs))
    } else {
        console.log("We didn't even get all the songs brother")
    }
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
        const song = await response.json();
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

    if (response.ok) {
        const { song } = await response.json()
        dispatch(updateSong(song))
        return song
    } else {
        console.log("Something went wrong in the thunk")
    }
}

export const removeSong = (song_id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${song_id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const song = await response.json()
        dispatch(deleteSong(song_id))
        return song
    } else {
        console.log("Something went wrong in the thunk"), 400
    }
}

export const getLikedSongs = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/songs/liked_songs/${user_id}`)

    if (response.ok) {
        const { likedSongs } = await response.json()
        dispatch(loadLikedSongs(likedSongs))
        return likedSongs
    } else {
        console.log("Something went wrong in the thunk")
    }
}

export const loadSongToLikes = (user_id, song_id) => async (dispatch) => {
    const response = await fetch(`/api/songs/liked_songs/${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "song_id": song_id })
    })

    if (response.ok) {
        const { like } = await response.json()
        return like
    } else {
        console.log("Something went wrong in the thunk")
    }
}

export const removeSongFromLikes = (user_id, song_id) => async (dispatch) => {
    const response = await fetch(`/api/songs/liked_songs/${user_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "song_id": song_id })
    })

    if (response.ok) {
        const { like } = await response.json()
        dispatch(removeLikedSong(song_id))
        return like
    } else {
        console.log("Something went wrong in the thunk")
    }
}

//REDUCER
const initialState = {
    "songs": {},
    "likedSongs": {}
}

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_SONGS: {
            const songsState = {}
            action.songs.songs.forEach((song) => (
                songsState[song.id] = song
            ))
            state["songs"] = songsState
            return { ...state, songs: songsState }
        }
        case LOAD_SONG: {
            const newSong = { ...state.songs, [action.song.id]: action.song }
            return { ...state, songs: newSong }
        }
        case ADD_NEW_SONG: {
            console.log("LOOK HERE PLEASE", action.song);
            const newSong = { ...state.songs, [action.song.id]: action.song };
            return { ...state, songs: newSong };
        }
        case UPDATE_SONG: {
            state["songs"] = { ...state, ...action.song }
            return state
        }
        case DELETE_SONG: {
            const currState = { ...state.songs }
            delete currState[action.song_id]
            return { ...state, songs: currState }
        }
        case LOAD_LIKED_SONGS: {
            const likedSongsArr = Object.values(action.songs);
            const newLikedSongs = {};
            likedSongsArr.forEach((song) => {
                newLikedSongs[song.id] = song;
            });
            return { ...state, likedSongs: newLikedSongs };
        }
        case REMOVE_SONG_FROM_LIKES: {
            const newLikedSongs = { ...state.likedSongs };
            delete newLikedSongs[action.song_id];
            return { ...state, likedSongs: newLikedSongs };
        }
        case CLEAR_SONGS:
            return {};
        default:
            return state
    }
}


export default songReducer
