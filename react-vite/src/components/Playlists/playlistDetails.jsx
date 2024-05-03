import { useEffect, useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLikedSongs } from "../../redux/songs";
import { useSongPlaying } from "../../context/Song";
import { FaMinusCircle } from "react-icons/fa";
import { fetchAllPlaylistSongs, fetchSongPlaylistRemover } from "../../redux/songPlaylists";
import { loadSongToLikes } from "../../redux/songs";
import { removeSongFromLikes } from "../../redux/songs";
import { useLikedSong } from "../../context/Like";
import { fetchPlaylist } from "../../redux/playlists";
import { FaMinusSquare } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeletePlaylistModal from "./deleteSongModal";




function PlaylistDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { playlist_id } = useParams();
    // const [likeChange, setLikeChange] = useState(false)
    const { likeChange, setLikeChange } = useLikedSong();

    const [remove, setRemove] = useState(false);
    const { setSong } = useSongPlaying();


    const playlist = useSelector((state) => state.playlists.currPlaylist[playlist_id])

    const user = useSelector((state) => state.session.user);
    const likedSongs = useSelector((state) => state.songs?.likedSongs)

    let playlistSongs

    if (playlist?.songs) {
        playlistSongs = Object.values(playlist?.songs)
    } else {
        playlistSongs = []
    }

    const songs = playlist?.songs


    useEffect(() => {
        dispatch(getLikedSongs(user?.id))
        dispatch(fetchPlaylist(playlist_id))
        // dispatch(fetchAllPlaylistSongs())
    }, [dispatch, likeChange, user?.id, remove, playlist_id])

    const handleRemoveSongFromPlaylist = async (e, song_id, playlist_id) => {
        e.preventDefault();
        await dispatch(fetchSongPlaylistRemover(song_id, playlist_id))
        setRemove(prevState => !prevState)
    }

    const handleLike = async (e, user_id, song_id) => {
        e.preventDefault()
        await dispatch(loadSongToLikes(user_id, song_id)).then(
            setLikeChange(!likeChange))
    }

    const handleRemoveLike = async (e, user_id, song_id) => {
        e.preventDefault()
        await dispatch(removeSongFromLikes(user_id, song_id)).then(
            setLikeChange(!likeChange))
    }

    return (
        <div style={{ width: "100%" }}>
            <div className="albumHeader">
                <img className="albumCardImg" src={playlist?.cover_img} />
                <div className="albumHeaderInfo">
                    <h1 style={{ fontSize: "6vw" }}>{playlist?.title}</h1>
                    <div className="albumDescriptionItems">
                        <h3 className="albumDesc">{playlist?.description}</h3>
                        <OpenModalButton
                            className="modalButton"
                            buttonText={<FaMinusSquare className="removePlaylistButton" size={35} />}
                            modalComponent={<DeletePlaylistModal playlist_id={playlist_id} message={`Are you sure you want to delete your playlist: ${playlist?.title}`} />}
                        />
                    </div>
                </div>
            </div>
            <div className="albumBody">
                <div className="albumSongs">
                    <div style={{ width: "100%" }}>
                        <FaCirclePlay size={70} className="playlistPlayButton" style={{ cursor: "pointer" }} onClick={() => {
                            setSong(songs[0])
                        }} />
                    </div>
                    <div className="songLabels">
                        <div className="songTitleAlign">
                            <p>#</p>
                            <p>Title</p>
                        </div>
                    </div>
                    <div className="albumSongsContainer">
                        {playlistSongs.map((song, idx) => (
                            <div className="albumSongCard" key={idx} onClick={() => {
                                setSong(songs[song?.id])
                            }} >
                                <div className="songTitleAlign">
                                    <p style={{ marginRight: "20px" }}>{idx + 1}</p>
                                    <div className="playlistImgTitle">
                                        <img src={song?.cover_img} className="playlistCardImg" />
                                        <p>{song?.title}</p>
                                    </div>
                                </div>
                                <div className="iconItemsAlign">
                                    {likedSongs[song?.id] !== undefined ? <FaHeart className="likeButton" size={20} onClick={(e) => {
                                        handleRemoveLike(e, user?.id, song?.id)
                                    }} /> : <FaRegHeart className="likeButton" size={20} onClick={(e) => {
                                        handleLike(e, user?.id, song?.id)
                                    }} />}
                                    <FaMinusCircle size={20} className="pSongMinusButton" onClick={(e) => {
                                        handleRemoveSongFromPlaylist(e, song?.id, playlist_id)
                                    }} />
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
