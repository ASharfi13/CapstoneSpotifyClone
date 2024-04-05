import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAlbum } from "../../redux/albums";
import { createNewSong } from "../../redux/songs";


function AddSongToAlbum() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { album_id } = useParams();

    const album = useSelector((state) => state.albums[album_id])
    const user = useSelector((state) => state.session.user)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [song, setSong] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const errObj = {}
        if (title.length === 0) errObj.title = "Title is Required"
        if (!image) errObj.image = "Image is Required"
        if (!song) errObj.song = "Song is Required"

        setErrors(errObj)
    }, [title, image, song])

    useEffect(() => {
        dispatch(fetchAlbum(album_id));
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSong = new FormData()
        newSong.append("title", title)
        newSong.append("song_url", song)
        newSong.append("cover_img", image)
        newSong.append("artist_id", user?.id)
        newSong.append("album_id", album_id)

        if (Object.values(errors).length === 0) {
            setLoading(true)
            await dispatch(createNewSong(newSong))
            navigate(`/albums/${album_id}`)
        } else {
            window.alert("Fill Everything Correctly")
        }
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
                        <div>
                            <img className="newSongAlbumImgCard" src={album?.cover_img} />
                        </div>
                        <h1 className="formTitle">Add A New Song To {album?.title}</h1>
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
                            <p className="errorMessages">{errors.title ? errors.title : null}</p>
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
                            <p className="errorMessages">{errors.song ? errors.song : null}</p>
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
                            <p className="errorMessages">{errors.image ? errors.image : null}</p>
                        </div>
                        <button className="formButton">
                            Submit
                        </button>
                    </form>
                ) : <h1>Loading...</h1>}
            </div>
        </>
    )
}

export default AddSongToAlbum
