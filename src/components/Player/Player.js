import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Player.css";

function Player() {
    const {type, movieId, season, episode} = useParams();
    var URL = "";

    const navigate = useNavigate();

    if (type === 'tv')
        URL = `https://www.2embed.to/embed/tmdb/tv?id=${movieId}&s=${season}&e=${episode}`;
    else
        URL = `https://www.2embed.to/embed/tmdb/movie?id=${movieId}`;
    return (
        <div className="player">
            <ArrowBackIcon className="backButton" onClick={()=>{navigate(-1)}}/>
            <iframe
                title="myFrame"
                width="100%"
                height="100%"
                allowFullScreen="allowfullscreen"
                src={URL}
            ></iframe>
        </div>
    );
}

export default Player;