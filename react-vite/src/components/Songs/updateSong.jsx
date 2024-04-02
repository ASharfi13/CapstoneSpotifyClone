import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigate, useParams } from "react-router-dom";
import "./newSong.css"
import { createNewSong, fetchSong, fetchUpdateSong } from "../../redux/songs";

function UpdateSong() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { song_id } = useParams()

    const song = useSelector((state) => state.songs[song_id])

    const [title, setTitle] = useState(song?.title);
    const [coverImg, setCoverImg] = useState(song?.cover_img);
    const [newSong, setNewSong] = useState(song?.song_url);

    const [errors, setErrors] = useState({})

    console.log("Song", song)

    useEffect(() => {
        const errObj = {}
        console.log(title)
        if (title && title.length === 0) errObj.title = "Title Is Required"
        setErrors(errObj)
    }, [title])

    useEffect(() => {
        dispatch(fetchSong(song_id));
        setTitle(song?.title)
        setCoverImg(song?.cover_img)
    }, [dispatch, song_id, song?.title, song?.cover_img])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedSong = new FormData
        updatedSong.append("title", title)
        updatedSong.append("song_url", newSong)
        updatedSong.append("cover_img", coverImg)
        updatedSong.append("artist_id", song?.artist_id)

        if (Object.values(errors).length === 0) {
            dispatch(fetchUpdateSong(song_id, updatedSong)).then(
                window.alert("Request Sent")
            )
        } else {
            window.alert("Fill Everything Out Correctly")
        }
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
                    <p style={{ color: "red" }}>{errors.title ? errors.title : null}</p>
                </div>
                <div className="songAudioInput">
                    <label htmlFor="audioUpload">Song File Upload</label>
                    <input
                        id="audioUpload"
                        className="input-field"
                        type="file"
                        accept=".mp3"
                        onChange={(e) => setNewSong(e.target.files[0])}
                    >
                    </input>
                </div>
                <div className="songImageInput">
                    <img className="songImg" src={song?.cover_img}></img>
                    <label htmlFor="imageUpload">Cover Image Upload</label>
                    <input
                        id="imageUpload"
                        className="input-field"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImg(e.target.files[0])}
                    >
                    </input>
                </div>
                <button>
                    Update Song
                </button>
            </form>
        </>
    )
}

export default UpdateSong
