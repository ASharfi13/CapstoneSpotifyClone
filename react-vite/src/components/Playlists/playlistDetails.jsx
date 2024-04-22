import { useEffect, useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLikedSongs } from "../../redux/songs";
import { useSongPlaying } from "../../context/Song";

function PlaylistDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { playlist_id } = useParams();
    const [likeChange, setLikeChange] = useState(false)
    const { setSong } = useSongPlaying();


    const playlist = useSelector((state) => state.playlists[playlist_id])
    const user = useSelector((state) => state.session.user);
    const likedSongs = useSelector((state) => state.songs.likedSongs)
    const likedSongsArr = Object.values(likedSongs);

    const songs = playlist?.songs

    useEffect(() => {
        dispatch(getLikedSongs(user?.id))
    }, [dispatch, likeChange])

    return (
        <div style={{ width: "100%" }}>
            <div className="albumHeader">
                <img className="albumCardImg" src={playlist?.cover_img} />
                <div className="albumHeaderInfo">
                    <h1 style={{ fontSize: "6vw" }}>{playlist?.title}</h1>
                    <h3>{playlist?.description}</h3>
                </div>
            </div>
            <div className="albumBody">
                <div className="albumSongs">
                    <div style={{ width: "100%" }}>
                        <FaCirclePlay size={70} className="playlistPlayButton" style={{ cursor: "pointer" }} onClick={() => {
                            setSong(songs[0]?.song_url)
                        }} />
                    </div>
                    <div className="songLabels">
                        <div className="songTitleAlign">
                            <p>#</p>
                            <p>Title</p>
                        </div>
                    </div>
                    <div className="albumSongsContainer">
                        {playlist?.songs?.map((song, idx) => (
                            <div className="albumSongCard" key={idx}>
                                <div className="songTitleAlign">
                                    <p style={{ marginRight: "20px" }}>{idx + 1}</p>
                                    <div className="playlistImgTitle">
                                        <img src={song?.cover_img} className="playlistCardImg" />
                                        <p>{song?.title}</p>
                                    </div>
                                </div>
                                <div className="iconItemsAlign">
                                    {likedSongs[song?.id] !== undefined ? <FaHeart size={20} onClick={(e) => {
                                        handleRemoveLike(e, user?.id, song?.id)
                                    }} /> : <FaRegHeart size={20} onClick={(e) => {
                                        handleLike(e, user?.id, song?.id)
                                    }} />}
                                    <IoMdAddCircleOutline color="var(--lightp)" size={25} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistDetails
