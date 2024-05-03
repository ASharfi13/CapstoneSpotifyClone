import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLikedSongs } from "../../redux/songs";
import { IoIosAddCircle } from "react-icons/io";
import { PiMusicNoteFill } from "react-icons/pi";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSongPlaying } from "../../context/Song";



function LikedSongsPlaylists() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const likedSongs = useSelector((state) => state.songs.likedSongs);
    const likedSongsArr = Object.values(likedSongs);
    const { setSong } = useSongPlaying()

    useEffect(() => {
        dispatch(getLikedSongs(user?.id))
    }, [dispatch])



    return (
        <div style={{ width: "100%" }}>
            <div className="albumHeader">
                <div className="albumCardImg" style={{ background: "linear-gradient(to bottom, var(--purple) 0%, var(--darkp) 120%)" }}>
                    <PiMusicNoteFill size={220} />
                </div>
                <div className="albumHeaderInfo">
                    <h1 style={{ fontSize: "6vw" }}>Liked Songs</h1>
                </div>
            </div>
            <div className="albumBody">
                <div className="albumSongs">
                    <div style={{ width: "100%" }}>
                        <FaCirclePlay size={70} className="playlistPlayButton" style={{ cursor: "pointer" }} onClick={() => {
                            setSong(likedSongsArr[0])
                        }} />
                    </div>
                    <div className="songLabels">
                        <div className="songTitleAlign">
                            <p>#</p>
                            <p>Title</p>
                        </div>
                    </div>
                    <div className="albumSongsContainer">
                        {likedSongsArr?.map((song, idx) => (
                            <div className="albumSongCard" key={idx} onClick={() => {
                                setSong(song)
                            }} >
                                <div className="songTitleAlign">
                                    <p style={{ marginRight: "20px" }}>{idx + 1}</p>
                                    <div className="playlistImgTitle">
                                        <img src={song?.cover_img} className="playlistCardImg" />
                                        <p>{song?.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LikedSongsPlaylists
