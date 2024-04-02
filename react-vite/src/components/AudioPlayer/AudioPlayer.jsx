import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSongPlaying } from '../../context/Song';


function SongPlayer() {

    const { song } = useSongPlaying();

    return (
        <>
            <AudioPlayer
                src={song}
            />
        </>
    )
}

export default SongPlayer
