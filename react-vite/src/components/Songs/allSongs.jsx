import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllSongs } from "../../redux/songs";
import "./allSongs.css"


function AllSongs() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const songs = useSelector((state) => state.songs)
    const songsArr = Object.values(songs)

    useEffect(() => {
        dispatch(fetchAllSongs())
    }, [dispatch])

    console.log(songsArr[0])


    return (
        <>
            <h1>
                This Is The Songs Component
            </h1>
            <div className="songContainer">
                {songsArr.map((song, idx) => (
                    <div className="songCard" key={idx}>
                        <img className="songImg" src={song.cover_img}></img>
                        <p>{song.title}</p>
                        <p>{song.album?.title} • {song.artist?.first_name} {song.artist?.last_name}</p>
                    </div>
                ))}
            </div>
        </>
    )

}

export default AllSongs
