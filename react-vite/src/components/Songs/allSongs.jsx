import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllSongs, removeLikedSong, removeSong } from "../../redux/songs";
import { fetchAllAlbums } from "../../redux/albums";
import { useSongPlaying } from "../../context/Song";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { getLikedSongs } from "../../redux/songs";
import { loadSongToLikes } from "../../redux/songs";
import { removeSongFromLikes } from "../../redux/songs";
import { fetchAllPlaylistSongs } from "../../redux/songPlaylists";
import { clearSongPlaylists } from "../../redux/songPlaylists";
import { useLikedSong } from "../../context/Like";

import AddSongPlaylistDrop from "../Playlists/addSongPlaylistDrop";

import "./allSongs.css"
import { usePlaylistSong } from "../../context/Playlist";


function AllSongs() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setSong } = useSongPlaying()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    // const [likeChange, setLikeChange] = useState(false);
    const { likeChange, setLikeChange } = useLikedSong();

    const [showAddPlaylist, setShowAddPlaylist] = useState(false);
    const [selectedSong, setSelectedSong] = useState(0);

    //Ref Varibale
    const dropMenuRef = useRef();

    const songs = useSelector((state) => state.songs?.songs);
    const albums = useSelector((state) => state.albums);
    const user = useSelector((state) => state.session.user);
    const likedSongs = useSelector((state) => state.songs.likedSongs);
    const playlists = useSelector((state) => state.playlists.playlists);

    const songsArr = Object.values(songs)

    //Handle Functions/UseEffects Below

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef?.current && !ulRef?.current?.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    useEffect(() => {
        dispatch(fetchAllSongs())
        dispatch(fetchAllAlbums())
        dispatch(getLikedSongs(user?.id))
        dispatch(fetchAllPlaylistSongs())

        return () => {
            dispatch(clearSongPlaylists({}))
        }
    }, [dispatch, likeChange, user?.id])

    //Click Outside Close Drop Down Use Effect:
    useEffect(() => {
        const handleClose = (e) => {
            if (!dropMenuRef?.current?.contains(e.target)) setShowAddPlaylist(false)
        }
        document.addEventListener("mousedown", handleClose)

        return () => {
            document.removeEventListener("mousedown", handleClose)
        }
    })

    const handleDelete = async (e, song_id) => {
        e.preventDefault();
        await dispatch(removeSong(song_id))
        navigate("/")
    }

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
        <>
            <div className="landingBodyCard">
                <h1 className="bodyCardHeading">
                    Top Songs
                </h1>
                <div className="songContainer">
                    {songsArr.map((song, idx) => (
                        <div className="songCard" key={idx}>
                            <img onClick={() => setSong(song)} className="songImg" src={song?.cover_img}></img>
                            {showAddPlaylist && selectedSong == song?.id ?
                                <div ref={dropMenuRef}>
                                    <AddSongPlaylistDrop playlists={playlists} song_id={song?.id} />
                                </div> : null}
                            <div className="songInfo">
                                <h3 className="songCardTitle" onClick={() => {
                                    if (!song?.album_id) {
                                        navigate(`/songs/${song?.id}`)
                                    } else {
                                        navigate(`/albums/${song?.album_id}`)
                                    }
                                }}>{song?.title}</h3>
                                <div className="songTitleInfo">
                                    <div className="songTitleIcons">
                                        <IoIosAddCircle className="addSongPlaylistButton" size={20} onClick={() => {
                                            if (!user) {
                                                window.alert("Please Log In to Add to Playlist")
                                            } else {
                                                setShowAddPlaylist(!showAddPlaylist)
                                                setSelectedSong(song?.id)
                                            }
                                        }} />
                                        {likedSongs[song?.id] !== undefined ? <FaHeart size={20} onClick={(e) => {
                                            if (user) {
                                                handleRemoveLike(e, user?.id, song?.id)
                                            } else {
                                                window.alert("Log In to Add this Song to your Likes!")
                                            }
                                        }} /> : <FaRegHeart size={20} onClick={(e) => {
                                            if (user) {
                                                handleLike(e, user?.id, song?.id)
                                            } else {
                                                window.alert("Log In to Add this Song to your Likes!")
                                            }
                                        }} />}
                                    </div>
                                </div>
                                <p className="songInfoText"> {albums[song?.album_id]?.title || "Single"}  • {song?.artist?.first_name} {song?.artist?.last_name}</p>
                            </div>
                            {song?.artist_id === user?.id ? (
                                <div className="editDeleteContainer">
                                    <span onClick={toggleMenu}><PiDotsThreeOutlineFill size={30} /></span>
                                    {showMenu && (
                                        <div className="editDeleteMenu">
                                            <p className="editDeleteButton" onClick={() => navigate(`/songs/${song?.id}/update`)}>Update</p>
                                            <p className="editDeleteButton" onClick={(e) => {
                                                if (window.confirm("Are you sure you want to delete this Song?")) {
                                                    handleDelete(e, song?.id)
                                                }
                                            }}>Delete</p>
                                        </div>
                                    )}
                                </div>

                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default AllSongs
