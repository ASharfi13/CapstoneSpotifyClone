import { NavLink } from "react-router-dom";
import { useSearch } from "../../context/Search";
import "./SearchModal.css"
import { useSelector } from "react-redux";

export default function SearchModal() {
    const { results, handleExit } = useSearch();
    const albums = useSelector((state) => state.albums);

    return (
        <div>
            {results?.length > 0 &&
                <div className="song-results">
                    {results?.map(song => (
                        <NavLink to={song?.album_id ? `/albums/${song?.album_id}` : `/songs/${song?.id}`} className="song-result" key={song?.id} onClick={handleExit}>
                            <img src={song?.cover_img} />
                            <div>{song?.title}</div>
                            •
                            <div>{song?.album_id ? albums[song?.album_id]?.title : "Single"}</div>
                            -
                            <div>{song?.artist?.first_name} {song?.artist?.last_name}</div>
                        </NavLink>
                    ))}
                </div>
            }
        </div>
    )
}
