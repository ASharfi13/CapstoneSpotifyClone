import AllSongs from "../Songs/allSongs"
import AllAlbums from "../Albums/allAlbums"
import MyPlaylists from "../Playlists/myPlaylists"
import "./LandingPage.css"

function LandingPage() {
    return (
        <>
            <div className="landingLayout">
                <div>
                    <AllSongs />
                    <AllAlbums />
                </div>
            </div>
        </>
    )
}

export default LandingPage
