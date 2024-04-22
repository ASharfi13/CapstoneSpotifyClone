import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchAllPlaylists } from "../../redux/playlists"
import { IoIosAddCircle } from "react-icons/io";
import { PiMusicNoteFill } from "react-icons/pi";
import "./myPlaylists.css"


function MyPlaylists() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const playlists = useSelector((state) => state.playlists);
    const playlistArr = Object.values(playlists);
    const user = useSelector((state) => state.session.user);

    const myPlaylistsArr = []

    playlistArr.forEach((playlist) => {
        if (playlist?.user_id == user?.id) myPlaylistsArr.push(playlist)
    })

    console.log(myPlaylistsArr)

    useEffect(() => {
        dispatch(fetchAllPlaylists())
    }, [dispatch])

    return (
        <>
            <div className="playlistContainer">
                <h2 style={{ fontWeight: "lighter" }}> My Playlists</h2>
                <div className="playlistCardContainer">
                    <div className="playlistCard" onClick={() => {
                        if (user) {
                            navigate(`/playlists/liked_songs/${user?.id}`)
                        } else {
                            window.alert("Please Log In to see your Liked Songs!")
                        }
                    }}>
                        <div className="likedPlaylistIconContainer">
                            <PiMusicNoteFill size={25} className="likedPlaylistIcon" />
                        </div>
                        <p style={{ fontWeight: "100" }}>Liked Songs</p>
                    </div>
                    {myPlaylistsArr.map((playlist, idx) => (
                        <div key={idx} className="playlistCard" onClick={() => navigate(`/playlists/${playlist?.id}`)}>
                            <img className="playlistCardImg" src={playlist?.cover_img} />
                            <p style={{ fontWeight: "100" }}>{playlist?.title}</p>
                        </div>
                    ))}
                    {user ? <div className="addPlaylistButton" onClick={() => navigate("/playlists/new")}> <IoIosAddCircle color="var(--purple)" size={45} /> </div> : null}
                </div>
            </div>
        </>
    )
}

export default MyPlaylists
