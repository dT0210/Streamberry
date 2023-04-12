import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import axios from "../../requests/axios";
import "./Player.css";

function Player() {
    const {type, movieId, season, episode} = useParams();
    var URL = "";
    const [episodes, setEpisodes] = useState();

    const navigate = useNavigate();

    if (type === 'tv')
        URL = `https://www.2embed.to/embed/tmdb/tv?id=${movieId}&s=${season}&e=${episode}`;
    else
        URL = `https://www.2embed.to/embed/tmdb/movie?id=${movieId}`;

    useEffect(() => {
        if (type === 'tv')
        {
            const controller = new AbortController();
            async function fetchEpisodes() {
                await axios.get(`/${type}/${movieId}/season/${season}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`, {signal: controller.signal})
                .then((request) => {
                    setEpisodes(request.data.episodes);
                })
            }
            fetchEpisodes();
            return () => {
                controller.abort();
            }
        }
    }, [type, movieId, season])

    const changeEpisode = (e) => {
        navigate(`/watching/tv/${movieId}/${season}/${e}`)
    }

    return (
        <div className="player">
            <ArrowBackIcon className="backButton" onClick={()=>{navigate(-1)}}/>
            {(type === 'tv') && (
                <div className="episodes_list">
                    <select className="dropdownBox" id="episodes" defaultValue={episode} onChange={e => {changeEpisode(e.target.value)}}>
                        {episodes?.map((episode) => (<option value={episode.episode_number}>Episode {episode.episode_number}. {episode.name}</option>))}
                    </select>
                </div>
            )}
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