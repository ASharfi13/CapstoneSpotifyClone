import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllAlbums, fetchDeleteAlbum } from "../../redux/albums";


function AllAlbums() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const albums = useSelector((state) => state.albums)
    const albumsArr = Object.values(albums)

    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])

    const handleDelete = async (e, album_id) => {
        e.preventDefault()
        dispatch(fetchDeleteAlbum(album_id)).then(
            window.alert("Album Deleted")
        )
    }


    return (
        <>
            <h1>
                This Is The Albums Component
            </h1>
            <div className="songContainer">
                {albumsArr.map((album, idx) => (
                    <div className="songCard" key={idx} onClick={() => navigate(`/albums/${album?.id}`)}>
                        <img className="songImg" src={album.cover_img}></img>
                        <p>{album.title}</p>
                        <p>{album.genre} • {album.artist?.first_name} {album.artist?.last_name}</p>
                        <div>
                            <button onClick={() => navigate(`/albums/${album?.id}/update`)}>Update</button>
                            <button onClick={(e) => handleDelete(e, album?.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default AllAlbums
