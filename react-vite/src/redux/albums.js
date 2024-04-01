// ACTION TYPE CREATOR
const LOAD_ALL_ALBUMS = "album/loadAllAlbums";
const LOAD_ALBUM = "album/loadAlbum";
const CLEAR_ALBUMS = "album/clearAlbums";


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
    const response = await fetch(`/api/albums/${album_id}}`)

    if (response.ok) {
        const album = await response.json();
        dispatch(loadAlbum(album))
        return album
    } else {
        return { "Error": "FETCH FAILED" }
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
        case LOAD_ALBUM:
            return { ...state, [action.album.id]: action.album }
        case CLEAR_ALBUMS:
            return {};
        default:
            return state
    }
}


export default albumReducer
