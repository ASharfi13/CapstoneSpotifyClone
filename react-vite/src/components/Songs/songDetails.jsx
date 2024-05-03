import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import { useSongPlaying } from "../../context/Song";
import { getLikedSongs } from "../../redux/songs";
import { loadSongToLikes } from "../../redux/songs";
import { removeSongFromLikes } from "../../redux/songs";


function SongDetails() {
    const dispatch = useDispatch();
    const { song_id } = useParams();
    const user = useSelector((state) => state.session.user)
    const songs = useSelector((state) => state.songs.songs)
    const likedSongs = useSelector((state) => state.songs.likedSongs);
    const likedSongsArr = Object.values(likedSongs);
    const [likeChange, setLikeChange] = useState(false);
    const song = songs[song_id]

    const { setSong } = useSongPlaying();

    useEffect(() => {
        dispatch(getLikedSongs(user?.id))
    }, [dispatch, user?.id, likeChange, likedSongsArr.length])

    const handleLike = async (e, user_id, song_id) => {
        e.preventDefault()
        await dispatch(loadSongToLikes(user_id, song_id))
        setLikeChange(!likeChange)
    }

    const handleRemoveLike = async (e, user_id, song_id) => {
        e.preventDefault()
        await dispatch(removeSongFromLikes(user_id, song_id))
        setLikeChange(!likeChange)
    }


    return (
        <div style={{ width: "100%" }}>
            <div className="albumHeader">
                <img className="albumCardImg" src={song?.cover_img} />
                <div className="albumHeaderInfo">
                    <h1 style={{ fontSize: "120px" }}>{song?.title}</h1>
                    <h3>{song?.artist?.first_name} {song?.artist?.last_name}</h3>
                </div>
            </div>
            <div className="albumBody">
                <div className="albumSongs">
                    <div style={{ width: "100%" }}>
                        <FaCirclePlay size={70} className="playlistPlayButton" style={{ cursor: "pointer" }} onClick={() => {
                            setSong(song)
                        }} />
                    </div>
                    <div className="songLabels">
                        <div className="songTitleAlign">
                            <p>Title</p>
                        </div>
                    </div>
                    <div className="albumSongsContainer">
                        <div className="albumSongCard" onClick={() => {
                            setSong(song)
                        }}>
                            <div className="songTitleAlign">
                                <div className="playlistImgTitle">
                                    <img src={song?.cover_img} className="playlistCardImg" />
                                    <p>{song?.title}</p>
                                </div>
                            </div>
                            <div className="iconItemsAlign">
                                {likedSongsArr.length == 0 || likedSongs[song?.id] !== undefined ? <FaHeart size={20} style={{ cursor: "pointer" }} onClick={(e) => {
                                    handleRemoveLike(e, user?.id, song?.id)
                                }} /> : <FaRegHeart size={20} style={{ cursor: "pointer" }} onClick={(e) => {
                                    handleLike(e, user?.id, song?.id)
                                }} />}
                                <IoMdAddCircleOutline color="var(--lightp)" size={25} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SongDetails
