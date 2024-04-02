import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbum } from "../../redux/albums";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./album.css"

function AlbumDetails() {
    const { album_id } = useParams()
    const dispatch = useDispatch()

    const album = useSelector((state) => state.albums[album_id])

    const albumYear = album?.created_at?.slice(0, 4)

    console.log(albumYear)

    console.log("Album State", album)

    useEffect(() => {
        dispatch(fetchAlbum(album_id))
    }, [dispatch])

    return (
        <>
            <div>
                <h1>{album?.title}</h1>
                <p>{album?.artist?.first_name} {album?.artist?.last_name} • {albumYear} • {album?.songs?.length}</p>
            </div>
            <div>
                {album?.songs?.map((song, idx) => (
                    <div className="albumSongCard" id="idx">
                        <p>{song?.title}</p>
                        <FaRegHeart />
                        <IoMdAddCircleOutline />
                    </div>
                ))}
            </div>
        </>
    )
}

export default AlbumDetails
