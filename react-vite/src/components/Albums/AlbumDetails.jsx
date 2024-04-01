import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbum } from "../../redux/albums";
import { useParams } from "react-router-dom";

function AlbumDetails() {
    const { album_id } = useParams()
    const dispatch = useDispatch()

    const album = useSelector((state) => state.albums)

    console.log("Album State", album)

    console.log("Album Id", album_id)

    useEffect(() => {
        dispatch(fetchAlbum(album_id))
    }, [dispatch])

    return (
        <>
            <h1>This is the Album's Component</h1>
        </>
    )
}

export default AlbumDetails
