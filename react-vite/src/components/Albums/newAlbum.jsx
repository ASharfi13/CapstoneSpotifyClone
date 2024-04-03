import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { writeNewAlbum } from "../../redux/albums";


function NewAlbum() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.session.user)

    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState("")
    const [coverImg, setCoverImg] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const genresArr = ["Hip-Hop", "Pop", "Rock", "Reggaeton", "Country", "Rap", "Indie", "Alternative", "Reggae", "House", "Punk", "Heavy Metal", "Techno", "Jazz", "RnB", "K-Pop", "Folk"]

    useEffect(() => {
        const errObj = {}
        if (title.length === 0) errObj.title = "Title is Required"

        setErrors(errObj)
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAlbum = new FormData()
        newAlbum.append("title", title)
        newAlbum.append("genre", genre)
        newAlbum.append("cover_img", coverImg)
        newAlbum.append("artist_id", user?.id)

        if (Object.values(errors).length === 0) {
            setLoading(true)
            await dispatch(writeNewAlbum(newAlbum))
        } else {
            window.alert("Fill Everything Correctly")
        }

        navigate("/")
    }

    return (
        <>
            <h1>Add A New Album</h1>
            {!loading ? (
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
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

export default NewAlbum
