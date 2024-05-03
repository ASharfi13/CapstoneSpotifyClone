import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";
import { removeSong } from "../../redux/songs";



function DeleteSongModal({ song_id, message }) {
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        setDeleted(true);
        await dispatch(removeSong(song_id))
        navigate("/")
        closeModal();
    }

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     setDeleted(true);
    //     await dispatch(fetchDeletePlaylist(song_id))
    //     navigate("/")
    //     closeModal();
    // }

    const handleCancel = async (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className="deletePlaylistModalContainer">
            <h1>{message}</h1>
            <div>
                {!deleted ? <div className="deletePlayButtonContainer">
                    <button className="deletePlaylistButton" onClick={handleCancel}>No</button>
                    <button className="deletePlaylistButton" onClick={handleDelete}>Yes</button>
                </div> : <ScaleLoader color="var(--darkp)" />}
            </div>
        </div>
    )

}


export default DeleteSongModal
