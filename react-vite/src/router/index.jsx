import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import NewSong from '../components/Songs/newSong';
import AlbumDetails from '../components/Albums/AlbumDetails';
import UpdateSong from '../components/Songs/updateSong';

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
      }
    ],
  },
]);
