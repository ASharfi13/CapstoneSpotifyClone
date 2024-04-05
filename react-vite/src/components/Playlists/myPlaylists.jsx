import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllPlaylists } from "../../redux/playlists"
import { FaMusic } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import "./myPlaylists.css"


function MyPlaylists() {
    const dispatch = useDispatch()
    const playlists = useSelector((state) => state.playlists);
    const playlistArr = Object.values(playlists);

    useEffect(() => {
        dispatch(fetchAllPlaylists())
    }, [dispatch])

    return (
        <>
            <div className="playlistContainer">
                <h2 style={{ fontWeight: "lighter" }}> <FaMusic /> My Playlists</h2>
                <div className="playlistCardContainer">
                    {playlistArr.map((playlist, idx) => (
                        <div key={idx} className="playlistCard">
                            <img className="playlistCardImg" src={playlist?.cover_img} />
                            <p style={{ fontWeight: "100" }}>{playlist?.title}</p>
                        </div>
                    ))}
                    <div> <IoIosAddCircle color="var(--purple)" size={45} /> </div>
                </div>
            </div>
        </>
    )
}

export default MyPlaylists
