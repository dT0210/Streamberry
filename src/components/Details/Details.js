import React, { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "../../requests/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Details.css";
import { useRef } from "react";

function Details(props) {
    const movie = props.movie;
    const handleClose = props.handleClose;
    const truncate = (input, length) =>
        input?.length > length ? `${input.substring(0, length+30)}..` : input;
    
    const [movieCast, setMovieCast] = useState();
    const [movieDirector, setMovieDirector] = useState();
    const [details, setDetails] = useState();
    const [tvSeason, setTvSeason] = useState();
    const [episodes, setEpisodes] = useState();

    const ref = useRef(null);

    let type;
    if (props.mediaType === "")
        type = movie.media_type;
    else
        type = props.mediaType;

    const creditsURL = `/${type}/${movie.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
    const detailsURL = `/${type}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

    useEffect(() => {
        async function fetchCredits() {
            const request = await axios.get(creditsURL);
            setMovieDirector(request.data.crew.find(person => {
                return person.job === "Director";
            }));
            setMovieCast(request.data.cast);
        }

        async function fetchDetails() {
            const request = await axios.get(detailsURL);
            setDetails(request.data);
            setTvSeason(request.data.seasons[0].season_number);
        }
        
        fetchCredits();
        fetchDetails();
    }, [creditsURL, detailsURL])

    useEffect(() => {
        async function fetchEpisodes() {
            const request = await axios.get(`/${type}/${movie.id}/season/${tvSeason}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
            setEpisodes(request.data.episodes);
        }
        fetchEpisodes();
    }, [type, movie.id, tvSeason])

    const navigate = useNavigate();
    const playClick = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
    }

    const seasonChange = (season) => {
        setTvSeason(season);
        console.log(season);
    };
    
    return (
        <div className="overlay" 
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backgroundBlendMode: "overlay",
                backgroundSize: "cover",
                backgroundPosition: " center center"
            }}>
                <div className="description">
                    <div className="description__left">
                        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                        <button className="overlay__button" onClick={()=>{playClick()}}>Play</button>
                        <h3>Release Date: {movie?.release_date}</h3>
                        <p>{truncate(movie?.overview, 300)}</p>
                    </div>
                    
                    <div className="description__right">
                        <CancelIcon 
                            onClick={handleClose}
                            style={{
                                cursor: "pointer",
                                float: "right",
                                marginTop: "10px"
                            }}
                        />
                        {(movieCast !== undefined) && (details !== undefined) && (
                            <div style={{
                            marginTop: "150px"
                            }}>
                                {(type === "movie") && (
                                    <p>Director: <span>{movieDirector.name}</span></p>
                                )}
                                
                                {(type === "tv") && (
                                    <p>Created by: {details.created_by.map((creator) => (<span>{creator.name}, </span>))}</p>
                                )}
                                <p>Cast: <span>{movieCast[0]?.name}, {movieCast[1]?.name}, {movieCast[2]?.name}</span></p>
                                <p>Genres: {details.genres.map((genre) => (<span>{genre.name}, </span>))}</p> 
                            </div>
                        )}
                    </div>
                </div>
                
                {(type === 'tv') && (episodes !== undefined) && (
                    <div className="tvEpisodes" ref={ref}>
                        <div className="seasonBox">
                            <h2>Episodes</h2>
                            <select className="seasons" id="seasons" onChange={e => {seasonChange(e.target.value)}}>
                                {details?.seasons.map((season) => (<option value={season.season_number}>{season.name}</option>))}
                            </select>
                        </div>
                        <div className="episodeList">
                            {episodes.map((episode) => (
                                <div className="episode">
                                    <img 
                                        className="episode__img"
                                        src={`https://image.tmdb.org/t/p/original/${episode?.still_path}`}
                                        alt=""
                                    />
                                    <div className="episode__content">
                                        <h3>{episode.name}</h3>
                                        <p>{truncate(episode.overview, 200)}</p>
                                    </div>
                                    
                                </div>))}
                        </div>
                    </div>
                )}
                
        </div>
    );
}

export default Details;