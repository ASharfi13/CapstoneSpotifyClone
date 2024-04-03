import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAlbum, fetchUpdateAlbum } from "../../redux/albums";


function UpdateAlbum() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { album_id } = useParams()

    const album = useSelector((state) => state.albums[album_id])
    const user = useSelector((state) => state.session.user)

    const genresArr = ["Hip-Hop", "Pop", "Rock", "Reggaeton", "Country", "Rap", "Indie", "Alternative", "Reggae", "House", "Punk", "Heavy Metal", "Techno", "Jazz", "RnB", "K-Pop", "Folk"]

    const [title, setTitle] = useState(album?.title)
    const [genre, setGenre] = useState(album?.genre)
    const [coverImg, setCoverImg] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const errObj = {}

        if (title?.length === 0) errObj.title = "Title is Required"
        setErrors(errObj)
    }, [title])

    useEffect(() => {
        dispatch(fetchAlbum(album_id))
        setTitle(album?.title)
        setGenre(album?.genre)
    }, [dispatch, album_id, album?.title, album?.genre])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedAlbum = new FormData
        updatedAlbum.append("title", title)
        updatedAlbum.append("genre", genre)
        updatedAlbum.append("cover_img", coverImg)
        updatedAlbum.append("artist_id", user?.id)

        if (Object.values(errors).length === 0) {
            await dispatch(fetchUpdateAlbum(album_id, updatedAlbum))
        } else {
            window.alert("Fill Everything Out")
        }

        navigate("/")
    }


    return (
        <>
            <h1>This Is the Update Album Form</h1>
            {!loading ? (
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    className="inputForm"
                >
                    <p>Album Title</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                    <p style={{ color: "red" }}>{errors.title ? errors.title : null}</p>
                    <div>
                        <select
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option value={""} disabled defaultValue={""}>Select One</option>
                            {genresArr.map((opp, idx) => (
                                <option key={idx} value={opp}> {opp} </option>
                            ))}
                        </select>

                    </div>

                    <div>
                        <img className="songImg" src={album?.cover_img}></img>
                        <label className="inputLabel" htmlFor="imgUpload">Cover Img Upload</label>
                        <input
                            id="imgUpload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setCoverImg(e.target.files[0])}
                            className="songInput"
                        >
                        </input>
                    </div>

                    <button>Submit</button>

                </form>
            ) : <h1>Loading...</h1>}

        </>
    )
}

export default UpdateAlbum
