import { useContext, createContext, useState } from "react";

export const LikedSongContext = createContext();
export const useLikedSong = () => useContext(LikedSongContext);


export function LikedSongProvider({ children }) {
    const [likeChange, setLikeChange] = useState(false);

    return (
        <LikedSongContext.Provider
            value={{ likeChange, setLikeChange }}
        >
            {children}
        </LikedSongContext.Provider>
    )
}
