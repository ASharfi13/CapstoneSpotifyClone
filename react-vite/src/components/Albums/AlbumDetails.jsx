import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbum } from "../../redux/albums";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import "./album.css"

function AlbumDetails() {
    const { album_id } = useParams()
    const dispatch = useDispatch()

    const album = useSelector((state) => state.albums[album_id])

    const albumYear = album?.created_at?.slice(0, 4)

    console.log(albumYear)

    console.log("Album State", album)

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
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlbumDetails
