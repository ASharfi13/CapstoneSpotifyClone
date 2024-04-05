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
        if (genre.length === 0) errObj.genre = "Genre is Required"
        if (!coverImg) errObj.coverImg = "Image is Required"

        setErrors(errObj)
    }, [title, genre, coverImg])

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
            navigate("/")
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
                        <h1 className="formTitle">Add A New Album</h1>
                        <div className="songTitle">
                            <label className="inputLabel" htmlFor="songTitle">
                                Album Title
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
                        <div>
                            <label className="inputLabel" htmlFor="genreInput">
                                Genre
                                <select
                                    id="genreInput"
                                    className="genreSelectInput"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                    <option value={""} disabled defaultValue={""}>Select One</option>
                                    {genresArr.map((opp, idx) => (
                                        <option key={idx} value={opp}> {opp} </option>
                                    ))}
                                </select>
                            </label>
                            <p className="errorMessages">{errors.genre ? errors.genre : null}</p>
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
                            <p className="errorMessages">{errors.coverImg ? errors.coverImg : null}</p>
                        </div>

                        <button className="formButton">Submit</button>

                    </form>
                ) : <h1>Loading...</h1>}
            </div>
        </>
    )
}

export default NewAlbum
