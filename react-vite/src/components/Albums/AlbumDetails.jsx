import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbum } from "../../redux/albums";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import { useSongPlaying } from "../../context/Song";
import { getLikedSongs } from "../../redux/songs";
import { loadSongToLikes } from "../../redux/songs";
import { removeSongFromLikes } from "../../redux/songs";
import "./album.css"

function AlbumDetails() {
    const { album_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likeChange, setLikeChange] = useState(false);
    const { setSong } = useSongPlaying();

    const album = useSelector((state) => state.albums[album_id]);
    const user = useSelector((state) => state.session.user);
    const likedSongs = useSelector((state) => state.songs.likedSongs)
    const likedSongsState = Object.values(likedSongs).length

    const songs = album?.songs
    const albumYear = album?.created_at?.slice(0, 4)

    useEffect(() => {
        dispatch(fetchAlbum(album_id))
        dispatch(getLikedSongs(user?.id))
    }, [dispatch, album_id, user?.id, likeChange, likedSongsState])

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
        <div className="albumContainer" style={{ width: "100%" }}>
            <div className="albumHeader">
                <img className="albumCardImg" src={album?.cover_img} />
                <div className="albumHeaderInfo">
                    <h1 style={{ fontSize: "80px" }}>{album?.title}</h1>
                    <h3>{album?.artist?.first_name} {album?.artist?.last_name} • {album?.genre} • {albumYear} • {album?.songs?.length}</h3>
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
                        {album?.songs?.map((song, idx) => (
                            <div className="albumSongCard" key={idx} onClick={() => {
                                setSong(song)
                            }}>
                                <div className="songTitleAlign">
                                    <p style={{ marginRight: "20px" }}>{idx + 1}</p>
                                    <div className="playlistImgTitle">
                                        <img src={song?.cover_img} className="playlistCardImg" />
                                        <p>{song?.title}</p>
                                    </div>
                                </div>
                                <div className="iconItemsAlign">
                                    {likedSongsState == 0 || likedSongs[song?.id] !== undefined ? <FaHeart size={20} style={{ cursor: "pointer" }} onClick={(e) => {
                                        handleRemoveLike(e, user?.id, song?.id)
                                    }} /> : <FaRegHeart size={20} style={{ cursor: "pointer" }} onClick={(e) => {
                                        handleLike(e, user?.id, song?.id)
                                    }} />}
                                    <IoMdAddCircleOutline color="var(--lightp)" size={25} />
                                </div>
                            </div>
                        ))}
                        {user?.id == album?.artist_id && (
                            <span onClick={() => navigate(`/albums/${album_id}/new_song`)}>
                                <h1 className="addSongToAlbumButton">Add Song</h1>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumDetails
