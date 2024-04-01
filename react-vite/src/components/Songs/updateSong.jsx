import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigate, useParams } from "react-router-dom";
import "./newSong.css"
import { createNewSong, fetchSong } from "../../redux/songs";

function UpdateSong() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { song_id } = useParams()

    const song = useSelector((state) => state.songs[song_id])

    const [title, setTitle] = useState(song?.title);
    const [coverImg, setCoverImg] = useState(song?.cover_img);
    const [songUrl, setSongUrl] = useState(song?.songUrl);

    console.log("Song", song)

    useEffect(() => {
        dispatch(fetchSong(song_id));
        setTitle(song?.title)
        setCoverImg(song?.cover_img)
    }, [dispatch, song_id, song?.title, song?.cover_img])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h1>This is the Update Song Form Component</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="songTitle">
                    <p>Song Title</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                </div>
                <div className="songAudioInput">
                    <label htmlFor="audioUpload">Song File Upload</label>
                    <input
                        id="audioUpload"
                        className="input-field"
                        type="file"
                        accept=".mp3"
                    >
                    </input>
                </div>
                <div className="songImageInput">
                    <img className="songImg" src={coverImg}></img>
                    <label htmlFor="imageUpload">Cover Image Upload</label>
                    <input
                        id="imageUpload"
                        className="input-field"
                        type="file"
                        accept="image/*"
                    >
                    </input>
                </div>
                <button>
                    Submit New Song
                </button>
            </form>
        </>
    )
}

export default UpdateSong
