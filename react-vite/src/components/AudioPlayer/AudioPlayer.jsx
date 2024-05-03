import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSongPlaying } from '../../context/Song';
import "./AudioPlayer.css"
import { PiMusicNoteFill } from 'react-icons/pi';


function SongPlayer() {

    const { song } = useSongPlaying();

    console.log(song);

    return (
        <div className='apContain'>
            <div className='audioPSongInfo'>
                {song ? <img className='audioP-song-Img' src={song?.cover_img} /> : <div className="songUnknownCardImg" style={{ background: "linear-gradient(to bottom, var(--purple) 0%, var(--darkp) 120%)" }}>
                    <PiMusicNoteFill size={60} />
                </div>}
                <img></img>
                <p className='audioPSongTitle'>{song ? song?.title : "Unknown"}</p>
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
