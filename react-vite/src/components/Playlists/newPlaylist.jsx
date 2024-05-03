import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewPlaylist } from "../../redux/playlists";



function NewPlaylist() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.session.user)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({})
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const errObj = {}
        if (title.length === 0) errObj.title = "Title is Required"
        if (!image) errObj.image = "Image is Required"
        if (description.length === 0) errObj.description = "Description is Required"

        setErrors(errObj)
    }, [title, image, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlaylist = new FormData()
        newPlaylist.append("title", title)
        newPlaylist.append("description", description)
        newPlaylist.append("cover_img", image)
        newPlaylist.append("user_id", user?.id)

        if (Object.values(errors).length === 0) {
            setLoading(true)
            await dispatch(createNewPlaylist(newPlaylist))
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
                        <h1 className="formTitle">Start A New Playlist</h1>
                        <div className="songTitle">
                            <label className="inputLabel" htmlFor="songTitle">
                                Playlist Title
                                <input
                                    id="songTitle"
                                    className="songTitleInput"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <p className="errorMessages">{errors.title ? errors.title : null}</p>
                        </div>
                        <div>
                            <label
                                className="descriptionLabel"
                                htmlFor="songTitle">
                                Description
                                <textarea
                                    className="descriptionInput"
                                    rows={5}
                                    cols={40}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                            <p className="errorMessages">{errors.description ? errors.description : null}</p>
                        </div>
                        <div className="songInput">
                            <label className="inputLabel" htmlFor="imageUpload">
                                Cover Image Upload
                                <input
                                    id="imageUpload"
                                    className="input-field"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </label>
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

export default NewPlaylist
