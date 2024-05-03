import { useEffect, useState } from "react"
import { PiMusicNotesPlusDuotone } from "react-icons/pi";
import { addSongToPlaylist } from "../../redux/songPlaylists";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidPlaylist } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { usePlaylistSong } from "../../context/Playlist";
import { FaCheck } from "react-icons/fa";

import Lottie from "lottie-react";
import checkAnimationData from "../../assets/Check_Animation - 1714492959738.json"
import { fetchAllPlaylists } from "../../redux/playlists";



function AddSongPlaylistDrop({ playlists, song_id }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const [add, setAdd] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [message, setMessage] = useState(false);
    const playlistSongs = useSelector((state) => state.songPlaylists);
    const playlistSongArr = Object.values(playlistSongs);

    const myPlaylists = Object.values(playlists).filter((playlist) => playlist?.user_id === user?.id && !playlist?.songs[song_id])

    const checkSong = {}

    console.log("look here", myPlaylists);

    const handleAddToPlaylist = async (e, song_id, playlist_id) => {
        e.preventDefault()
        setSelectedPlaylist(playlist_id)
        await dispatch(addSongToPlaylist(song_id, playlist_id))
        setAdd(true)
    }

    useEffect(() => {
        dispatch(fetchAllPlaylists())
    }, [dispatch])


    return (
        <div className="pdDContainer">
            {user && (
                <>
                    <h4>Your Playlists: </h4>
                    <div>
                        {myPlaylists.length ?
                            <div className="pdDPlaylistContainer">
                                {myPlaylists.map((playlist, idx) => (
                                    <div className="pdDPlaylist" key={idx} onClick={(e) => handleAddToPlaylist(e, song_id, playlist?.id)}>
                                        <img className="pdDCoverImg" src={playlist?.cover_img} />
                                        <p>{playlist?.title}</p>
                                        <br></br>
                                        {add && selectedPlaylist == playlist?.id && <Lottie animationData={checkAnimationData} className="loadingDisc" loop={false} />}
                                        <div>{message && selectedPlaylist == playlist?.id && (<p>Song Already Present <FaCheck color={'var(--purple)'} /></p>)}</div>
                                    </div>
                                ))}
                            </div> : <p className="pdDAllAddedText">Song Added to All Playlists</p>}
                    </div>
                </>
            )}
            {user && <div className="pdDLinks">
                <BiSolidPlaylist />
                <h4 onClick={() => navigate("/playlists/new")}>Create New Playlist</h4>
            </div>}
        </div >
    )
}

export default AddSongPlaylistDrop
