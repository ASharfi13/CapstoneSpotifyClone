import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigate, useParams } from "react-router-dom";
import "./newSong.css"
import { createNewSong, fetchSong, fetchUpdateSong } from "../../redux/songs";

function UpdateSong() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { song_id } = useParams()

    const song = useSelector((state) => state.songs.songs[song_id])
    const user = useSelector((state) => state.session.user)

    const [title, setTitle] = useState(song?.title);
    const [coverImg, setCoverImg] = useState(song?.cover_img);
    const [newSong, setNewSong] = useState(song?.song_url);
    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState({})



    useEffect(() => {
        const errObj = {}
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
        updatedSong.append("artist_id", user?.id)

        if (Object.values(errors).length === 0) {
            setLoading(true)
            await dispatch(fetchUpdateSong(song_id, updatedSong))
        } else {
            window.alert("Fill Everything Out Correctly")
        }

        navigate("/")
    }

    return (
        <>
            <div className="formContainer">
                {!loading ? (
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="inputForm"
                    >
                        <h1 className="formTitle">Change Up Your Song</h1>
                        <div className="songTitle">
                            <label className="inputLabel" htmlFor="songTitle">
                                Song Title
                                <input
                                    id="songTitle"
                                    className="songTitleInput"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </input>
                            </label>
                            <p style={{ color: "red" }}>{errors.title ? errors.title : null}</p>
                        </div>
                        <div className="songAudioInput">
                            <label className="inputLabel" htmlFor="audioUpload">
                                Choose New Song
                                <input
                                    id="audioUpload"
                                    className="songInput"
                                    type="file"
                                    accept=".mp3"
                                    onChange={(e) => setNewSong(e.target.files[0])}
                                >
                                </input>
                            </label>
                        </div>
                        <div className="updateCoverImg">
                            <img className="songImg" src={song?.cover_img}></img>
                            <label className="inputLabel" htmlFor="imageUpload">
                                Choose New Cover Image
                                <input
                                    id="imageUpload"
                                    className="songInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCoverImg(e.target.files[0])}
                                >
                                </input>
                            </label>
                        </div>
                        <button className="formButton">
                            Submit
                        </button>
                        <div className="updateWarning">
                            <p>* Not Uploading A New Song or Image File will result in the original files remaining</p>
                        </div>
                    </form>
                ) : <h1>Loading...</h1>}
            </div>
        </>
    )
}

export default UpdateSong
