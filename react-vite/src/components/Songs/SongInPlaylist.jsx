import { useModal } from "../../context/Modal";


function SongInPlaylist({ message }) {
    const { closeModal } = useModal();

    return (
        <div className="deletePlaylistModalContainer" onClick={closeModal}>
            <h1>{message}</h1>
        </div>
    )

}


export default SongInPlaylist
