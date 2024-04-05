import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchAllAlbums, fetchDeleteAlbum } from "../../redux/albums";
import { PiDotsThreeOutlineFill } from "react-icons/pi";


function AllAlbums() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const albums = useSelector((state) => state.albums)
    const user = useSelector((state) => state.session.user)
    const albumsArr = Object.values(albums)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

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

    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])

    const handleDelete = async (e, album_id) => {
        e.preventDefault()
        await dispatch(fetchDeleteAlbum(album_id))
        navigate("/")
    }


    return (
        <>
            <div className="landingBodyCard">
                <h1 className="bodyCardHeading">
                    Top Albums
                </h1>
                <div className="songContainer">
                    {albumsArr.map((album, idx) => (
                        <div className="songCard" key={idx}>
                            <img onClick={() => navigate(`/albums/${album?.id}`)} className="songImg" src={album.cover_img}></img>
                            <div className="songInfo">
                                <h3>{album.title}</h3>
                                <p className="songInfoText">{album.genre} • {album.artist?.first_name} {album.artist?.last_name}</p>
                            </div>
                            {album?.artist_id === user?.id ? (
                                <div className="editDeleteContainer">
                                    <span onClick={toggleMenu}><PiDotsThreeOutlineFill size={30} /></span>
                                    {showMenu && (
                                        <div className="editDeleteMenu">
                                            <p className="editDeleteButton" onClick={() => navigate(`/albums/${album?.id}/update`)}>Update</p>
                                            <p className="editDeleteButton" onClick={(e) => {
                                                if (window.confirm("Are you sure you want to delete this album?")) {
                                                    handleDelete(e, album?.id)
                                                }
                                            }}>Delete</p>
                                        </div>
                                    )}
                                </div>) : null}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default AllAlbums
