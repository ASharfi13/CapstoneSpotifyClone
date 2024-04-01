import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllSongs, removeSong } from "../../redux/songs";
import { fetchAllAlbums } from "../../redux/albums";
import "./allSongs.css"


function AllSongs() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const songs = useSelector((state) => state.songs)
    const albums = useSelector((state) => state.albums)
    const songsArr = Object.values(songs)

    useEffect(() => {
        dispatch(fetchAllSongs())
        dispatch(fetchAllAlbums())
    }, [dispatch])

    const song = songsArr[0]

    const handleDelete = async (e, song_id) => {
        e.preventDefault();
        dispatch(removeSong(song_id)).then(
            navigate("/")
        )
    }

    return (
        <>
            <h1>
                This Is The Songs Component
            </h1>
            <div className="songContainer">
                {songsArr.map((song, idx) => (
                    <div className="songCard" key={idx}>
                        <img className="songImg" src={song?.cover_img}></img>
                        <p>{song?.title}</p>
                        <p> {albums[song?.album_id]?.title || "Single"}  • {song?.artist?.first_name} {song?.artist?.last_name}</p>
                        <div className="function buttons">
                            <button onClick={() => navigate(`/songs/${song?.id}/update`)}> Update</button>
                            <button onClick={(e) => handleDelete(e, song?.id)}> Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default AllSongs
