import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSongPlaying } from '../../context/Song';
import "./AudioPlayer.css"
import { PiMusicNoteFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';


function SongPlayer() {
    const songs = useSelector((state) => state.songs.songs)
    const { song } = useSongPlaying();
    const songArtist = songs[song?.id]?.artist

    return (
        <div className='apContain'>
            <div className='audioPSongInfo'>
                {song ? <img className='audioP-song-Img' src={song?.cover_img} /> : <div className="songUnknownCardImg" style={{ background: "linear-gradient(to bottom, var(--purple) 0%, var(--darkp) 120%)" }}>
                    <PiMusicNoteFill size={60} />
                </div>}
                <img></img>
                <div className='audioP-song-details'>
                    <p className='audioPSongTitle'>{song ? song?.title : "Unknown"}</p>
                    <p className='audioPSongArtist'>{songArtist ? (<p>{songArtist?.first_name} {songArtist?.last_name}</p>) : null}</p>
                </div>
            </div>
            <AudioPlayer
                src={song?.song_url}
                showSkipControls={true}
                showFilledVolume={true}
                className='audioPlayer'
            />
        </div>
    )
}

export default SongPlayer
