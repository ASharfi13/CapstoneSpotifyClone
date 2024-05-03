import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSongs } from "../../redux/songs";
import { useEffect, useState } from "react";
import { useTopModal } from "../../context/TopModal";
import SearchModal from "./SearchModal";
import { useSearch } from "../../context/Search";
import "./SearchBar.css"

function SearchBar() {
    const dispatch = useDispatch();
    const { setModalContent } = useTopModal();
    const songs = useSelector((state) => state.songs.songs)
    const songsArr = Object.values(songs);
    const { input, setInput, results, setResults, handleExit } = useSearch();

    const findResults = () => {
        if (input) {
            setResults([])
            const currResults = songsArr.filter(song => song?.title?.toLowerCase().startsWith(input?.toLowerCase()))
            setResults(currResults)
        }
    }

    useEffect(() => {
        setResults([])
        findResults();
    }, [input])

    useEffect(() => {
        dispatch(fetchAllSongs())
    }, [dispatch])

    return (
        <div className="search-container">
            <div className="search-bar">
                <FaSearch />
                <input
                    type="text"
                    name="search-bar"
                    value={input}
                    onFocus={(e) => setModalContent(<SearchModal />)}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for a Song"
                >
                </input>
            </div>
        </div>
    )
}

export default SearchBar
