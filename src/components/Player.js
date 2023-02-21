import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Player() {
    const {movieId} = useParams();
    const location = useLocation();
    var URL = "";

    if (location.pathname === `/watching/tv/${movieId}`)
        URL = `https://www.2embed.to/embed/tmdb/tv?id=${movieId}&s=1&e=1`
    else
        URL = `https://www.2embed.to/embed/tmdb/movie?id=${movieId}`
    return (
        <div className="player">
            <iframe 
                title="myFrame"
                width="100%"
                height="100%"
                src={URL}
            ></iframe>
        </div>
    );
}

export default Player;