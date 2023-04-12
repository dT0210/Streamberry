import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import axios from "../../requests/axios";
import Select from "react-select";
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

    const dropdownStyle = {
        control: base => ({
            ...base,
            background: "rgb(11,11,11, 0.7)",
            borderColor: "white",
            "&:hover": {}
        }),
        menu: base => ({
            ...base,
            borderRadius: 0,
            color: 'rgb(216, 216, 216)',
            marginTop: 0,
            background: "rgb(20,20,20, 0.7)"
        }),
        option: base => ({
            ...base,
            backgroundColor: "",
            "&:hover": {
                background: "rgb(11,11,11)"
            }
        }),
        singleValue: base => ({
            ...base,
            color: "white"
        })
    }

    return (
        <div className="player">
            <ArrowBackIcon className="backButton" onClick={()=>{navigate('/browse')}}/>
            {(type === 'tv') && (
                <div className="episodes_list">
                    <Select
                        styles={dropdownStyle}
                        id="episodes" 
                        defaultValue={{value: '', label: 'Episodes'}}
                        onChange={e => {changeEpisode(e.value)}}
                        options = {
                            episodes?.map((ep) => {
                                return {
                                    value: ep.episode_number,
                                    label: 'Episode ' + ep.episode_number + '. ' + ep.name
                                };
                            })
                        }
                        isSearchable={false}
                    />
                    
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