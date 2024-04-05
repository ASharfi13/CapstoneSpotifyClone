import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllSongs, removeSong } from "../../redux/songs";
import { fetchAllAlbums } from "../../redux/albums";
import { useSongPlaying } from "../../context/Song";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import "./allSongs.css"


function AllSongs() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setSong } = useSongPlaying()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    const songs = useSelector((state) => state.songs)
    const albums = useSelector((state) => state.albums)
    const user = useSelector((state) => state.session.user)

    const songsArr = Object.values(songs)

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(fetchAllSongs())
        dispatch(fetchAllAlbums())
    }, [dispatch])


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
