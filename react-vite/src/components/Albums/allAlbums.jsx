import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllAlbums } from "../../redux/albums";


function AllAlbums() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const albums = useSelector((state) => state.albums)
    const albumsArr = Object.values(albums)

    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])


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
                    </div>
                ))}
            </div>
        </>
    )

}

export default AllAlbums
