import { useContext, createContext, useState } from "react";

export const SongPlayingContext = createContext();
export const useSongPlaying = () => useContext(SongPlayingContext)


export function SongPlayingProvider({ children }) {
    const [song, setSong] = useState(null);

    return (
        <SongPlayingContext.Provider
            value={{ song, setSong }}
        >
            {children}
        </SongPlayingContext.Provider>
    )
}
