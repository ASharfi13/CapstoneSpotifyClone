import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSongPlaying } from '../../context/Song';
import "./AudioPlayer.css"


function SongPlayer() {

    const { song } = useSongPlaying();

    return (
        <>
            <AudioPlayer
                src={song}
                showSkipControls={true}
                showFilledVolume={true}
                className='audioPlayer'
            />
        </>
    )
}

export default SongPlayer
