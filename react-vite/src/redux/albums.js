// ACTION TYPE CREATOR
const LOAD_ALL_ALBUMS = "album/loadAllAlbums";
const CLEAR_ALBUMS = "album/clearAlbums";


//ACTION CREATORS
export const loadAllAlbums = (albums) => {
    return {
        type: LOAD_ALL_ALBUMS,
        albums
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
    const albums = await response.json();
    dispatch(loadAllAlbums(albums))
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
        case CLEAR_ALBUMS:
            return {};
        default:
            return state
    }
}


export default albumReducer
