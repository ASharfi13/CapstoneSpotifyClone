import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import "./newSong.css"
import { createNewSong } from "../../redux/songs";

function NewSong() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.session.user)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [song, setSong] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const errObj = {}
        if (title.length === 0) errObj.title = "Title is Required"

        setErrors(errObj)
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSong = new FormData()
        newSong.append("title", title)
        newSong.append("song_url", song)
        newSong.append("cover_img", image)
        newSong.append("artist_id", user?.id)

        if (Object.values(errors).length === 0) {
            setLoading(true)
            await dispatch(createNewSong(newSong))
        } else {
            window.alert("Fill Everything Correctly")
        }

        navigate("/")
    }

    return (
        <>
            <h1>Add A New Song</h1>
            {!loading ? (
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="inputForm"
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
                    <div className="songInput">
                        <label className="inputLabel" htmlFor="audioUpload">Song File Upload</label>
                        <input
                            id="audioUpload"
                            className="input-field"
                            type="file"
                            accept=".mp3"
                            onChange={(e) => setSong(e.target.files[0])}
                        >
                        </input>
                    </div>
                    <div className="songInput">
                        <label className="inputLabel" htmlFor="imageUpload">Cover Image Upload</label>
                        <input
                            id="imageUpload"
                            className="input-field"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        >
                        </input>
                    </div>
                    <button>
                        Submit New Song
                    </button>
                </form>
            ) : <h1>Loading...</h1>}

        </>
    )
}

export default NewSong
