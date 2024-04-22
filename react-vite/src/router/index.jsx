import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import NewSong from '../components/Songs/newSong';
import AlbumDetails from '../components/Albums/AlbumDetails';
import UpdateSong from '../components/Songs/updateSong';
import NewAlbum from '../components/Albums/newAlbum';
import UpdateAlbum from '../components/Albums/updateAlbum';
import AddSongToAlbum from '../components/Albums/addSongToAlbum';
import NewPlaylist from '../components/Playlists/newPlaylist';
import PlaylistDetails from '../components/Playlists/playlistDetails';
import LikedSongsPlaylists from '../components/Playlists/likedSongsPlaylist';



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/songs/new",
        element: <NewSong />
      },
      {
        path: "/albums/:album_id",
        element: <AlbumDetails />
      },
      {
        path: "/songs/:song_id/update",
        element: <UpdateSong />
      },
      {
        path: "/albums/new",
        element: <NewAlbum />
      },
      {
        path: "/albums/:album_id/update",
        element: <UpdateAlbum />
      },
      {
        path: "/albums/:album_id/new_song",
        element: <AddSongToAlbum />
      },
      {
        path: "/playlists/new",
        element: <NewPlaylist />
      },
      {
        path: "/playlists/:playlist_id",
        element: <PlaylistDetails />
      },
      {
        path: "/playlists/liked_songs/:user_id",
        element: <LikedSongsPlaylists />
      }
    ],
  },
]);
