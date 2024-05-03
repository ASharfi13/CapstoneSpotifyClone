import { useContext, createContext, useState } from "react";

export const PlaylistSongContext = createContext();
export const usePlaylistSong = () => useContext(PlaylistSongContext);


export function PlaylistSongProvider({ children }) {
    const [playlistSong, setPlaylistSong] = useState(false);

    return (
        <PlaylistSongContext.Provider
            value={{ playlistSong, setPlaylistSong }}
        >
            {children}
        </PlaylistSongContext.Provider>
    )
}
