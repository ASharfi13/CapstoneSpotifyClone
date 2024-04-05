import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbum } from "../../redux/albums";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import "./album.css"

function AlbumDetails() {
    const { album_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const closeMenu = () => setShowMenu(false);

    const album = useSelector((state) => state.albums[album_id]);
    const user = useSelector((state) => state.session.user);

    const albumYear = album?.created_at?.slice(0, 4)

    useEffect(() => {
        dispatch(fetchAlbum(album_id))
    }, [dispatch])

    return (
        <>
            <div className="albumHeader">
                <img className="albumCardImg" src={album?.cover_img} />
                <div className="albumHeaderInfo">
                    <h1 style={{ fontSize: "120px" }}>{album?.title}</h1>
                    <h3>{album?.artist?.first_name} {album?.artist?.last_name} • {albumYear} • {album?.songs?.length}</h3>
                </div>
            </div>
            <div className="albumBody">
                <div className="albumSongs">
                    <div style={{ width: "100%" }}>
                        <FaCirclePlay size={70} />
                    </div>
                    <div className="songLabels">
                        <div className="songTitleAlign">
                            <p>#</p>
                            <p>Title</p>
                        </div>
                    </div>
                    <div className="albumSongsContainer">
                        {album?.songs?.map((song, idx) => (
                            <div className="albumSongCard" id="idx">
                                <div className="songTitleAlign">
                                    <p>{idx + 1}</p>
                                    <p>{song?.title}</p>
                                </div>
                                <div className="iconItemsAlign">
                                    <FaRegHeart color="var(--lightp)" size={20} />
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
        </>
    )
}

export default AlbumDetails
