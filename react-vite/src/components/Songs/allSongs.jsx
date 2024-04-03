import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllSongs, removeSong } from "../../redux/songs";
import { fetchAllAlbums } from "../../redux/albums";
import { useSongPlaying } from "../../context/Song";
import "./allSongs.css"


function AllSongs() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setSong } = useSongPlaying()

    const songs = useSelector((state) => state.songs)
    const albums = useSelector((state) => state.albums)
    const user = useSelector((state) => state.session.user)

    const songsArr = Object.values(songs)

    useEffect(() => {
        dispatch(fetchAllSongs())
        dispatch(fetchAllAlbums())
    }, [dispatch])

    const song = songsArr[0]

    const handleDelete = async (e, song_id) => {
        e.preventDefault();
        await dispatch(removeSong(song_id))
        navigate("/")
    }

    return (
        <>
            <div className="landingBodyCard">
                <h1 className="bodyCardHeading">
                    Top Songs
                </h1>
                <div className="songContainer">
                    {songsArr.map((song, idx) => (
                        <div className="songCard" key={idx}>
                            <img onClick={() => setSong(song?.song_url)} className="songImg" src={song?.cover_img}></img>
                            <div className="songInfo">
                                <h3>{song?.title}</h3>
                                <p className="songInfoText"> {albums[song?.album_id]?.title || "Single"}  • {song?.artist?.first_name} {song?.artist?.last_name}</p>
                            </div>
                            {song?.artist_id === user?.id ? (<div>
                                <button onClick={() => navigate(`/songs/${song?.id}/update`)}>Update</button>
                                <button onClick={(e) => handleDelete(e, song?.id)}>Delete</button>
                            </div>) : null}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default AllSongs
