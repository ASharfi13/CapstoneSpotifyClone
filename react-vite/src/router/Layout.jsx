import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { SongPlayingProvider } from "../context/Song";
import { LikedSongProvider } from "../context/Like";
import { PlaylistSongProvider } from "../context/Playlist";
import SongPlayer from "../components/AudioPlayer/AudioPlayer";
import MyPlaylists from "../components/Playlists/myPlaylists";
import { TopModal, TopModalProvider } from "../context/TopModal";
import { SearchProvider } from "../context/Search";


export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <TopModalProvider>
          <LikedSongProvider>
            <PlaylistSongProvider>
              <SongPlayingProvider>
                <SearchProvider>
                  <Navigation />
                  <TopModal />
                  <div>
                  </div>
                  {isLoaded &&
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <MyPlaylists />
                      <Outlet />
                    </div>
                  }
                  <Modal />
                  <SongPlayer />
                </SearchProvider>
              </SongPlayingProvider>
            </PlaylistSongProvider>
          </LikedSongProvider>
        </TopModalProvider>
      </ModalProvider>
    </>
  );
}
