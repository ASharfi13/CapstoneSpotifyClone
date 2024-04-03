// ACTION TYPE CREATOR
const LOAD_ALL_ALBUMS = "album/loadAllAlbums";
const LOAD_ALBUM = "album/loadAlbum";
const ADD_NEW_ALBUM = "album/loadNewAlbum";
const CLEAR_ALBUMS = "album/clearAlbums";
const UPDATE_ALBUM = "album/updateAlbum";
const DELETE_ALBUM = "album/deleteAlbum";


//ACTION CREATORS
export const loadAllAlbums = (albums) => {
    return {
        type: LOAD_ALL_ALBUMS,
        albums
    }
}

export const loadAlbum = (album) => {
    return {
        type: LOAD_ALBUM,
        album
    }
}

export const loadNewAlbum = (album) => {
    return {
        type: ADD_NEW_ALBUM,
        album
    }
}

export const updateAlbum = (album) => {
    return {
        type: UPDATE_ALBUM,
        album
    }
}

export const deleteAlbum = (album_id) => {
    return {
        type: DELETE_ALBUM,
        album_id
    }
}

export const clearAlbums = () => {
    return {
        type: CLEAR_ALBUMS
    };
};


//ACTION THUNK CREATORS
export const fetchAllAlbums = () => async (dispatch) => {
    const response = await fetch("/api/albums");

    if (response.ok) {
        const albums = await response.json();
        dispatch(loadAllAlbums(albums))
        return albums
    } else {
        return { "Error": "FETCH FAILED" }
    }
}

export const fetchAlbum = (album_id) => async (dispatch) => {
    const response = await fetch(`/api/albums/${album_id}`)

    if (response.ok) {
        const album = await response.json();
        dispatch(loadAlbum(album))
        return album
    } else {
        return { "Error": "FETCH FAILED" }
    }
}

export const writeNewAlbum = (newAlbum) => async (dispatch) => {
    const response = await fetch("/api/albums/", {
        method: "POST",
        body: newAlbum
    })

    if (response.ok) {
        const { album } = await response.json()
        dispatch(loadNewAlbum(album))
        return album
    } else {
        console.log("Something went wrong in the thunk")
    }
}

export const fetchUpdateAlbum = (album_id, album) => async (dispatch) => {
    const response = await fetch(`/api/albums/${album_id}`, {
        method: "PUT",
        body: album
    })

    if (response.ok) {
        const { album } = await response.json()
        dispatch(updateAlbum(album))
        return album
    } else {
        console.log("Something went wrong in the thunk")
    }
}

export const fetchDeleteAlbum = (album_id) => async (dispatch) => {
    const response = await fetch(`/api/albums/${album_id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const { album } = await response.json()
        dispatch(deleteAlbum(album_id))
        return album
    } else {
        console.log("Something went wrong in the thunk")
    }
}

//REDUCER
const albumReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALL_ALBUMS: {
            const albumsState = {}
            action.albums.albums.forEach((album) => (
                albumsState[album.id] = album
            ))
            return albumsState
        }
        case LOAD_ALBUM: {
            return { ...state, [action.album.id]: action.album }
        }
        case ADD_NEW_ALBUM: {
            return { ...state, ...action.album }
        }
        case UPDATE_ALBUM: {
            return { ...state, ...action.album }
        }
        case DELETE_ALBUM: {
            const currState = { ...state }
            delete currState[action.album_id]
            return currState
        }
        case CLEAR_ALBUMS:
            return {};
        default:
            return state
    }
}


export default albumReducer
