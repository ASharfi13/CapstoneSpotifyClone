import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllAlbums, fetchDeleteAlbum } from "../../redux/albums";


function AllAlbums() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const albums = useSelector((state) => state.albums)
    const user = useSelector((state) => state.session.user)
    const albumsArr = Object.values(albums)

    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])

    const handleDelete = async (e, album_id) => {
        e.preventDefault()
        await dispatch(fetchDeleteAlbum(album_id))
        navigate("/")
    }


    return (
        <>
            <div className="landingBodyCard">
                <h1 className="bodyCardHeading">
                    Top Albums
                </h1>
                <div className="songContainer">
                    {albumsArr.map((album, idx) => (
                        <div className="songCard" key={idx}>
                            <img onClick={() => navigate(`/albums/${album?.id}`)} className="songImg" src={album.cover_img}></img>
                            <div className="songInfo">
                                <h3>{album.title}</h3>
                                <p className="songInfoText">{album.genre} • {album.artist?.first_name} {album.artist?.last_name}</p>
                            </div>
                            {album?.artist_id === user?.id ? (<div>
                                <button onClick={() => navigate(`/albums/${album?.id}/update`)}>Update</button>
                                <button onClick={(e) => handleDelete(e, album?.id)}>Delete</button>
                            </div>) : null}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default AllAlbums
