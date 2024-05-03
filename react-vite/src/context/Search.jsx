import { useContext, createContext, useState } from "react";
import { useTopModal } from "./TopModal";

export const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }) {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    const { closeModal } = useTopModal();
    const handleExit = () => {
        setInput("");
        setResults([]);
        closeModal();
    }

    return (
        <SearchContext.Provider
            value={{ input, setInput, results, setResults, handleExit }}
        >
            {children}
        </SearchContext.Provider>
    )
}
