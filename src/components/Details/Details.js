import React, { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "../../requests/axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    const [tvSeason, setTvSeason] = useState(1);
    const [episodes, setEpisodes] = useState();

    const ref = useRef(null);

    let type;
    if (props.mediaType === "")
        type = movie.media_type;
    else
        type = props.mediaType;

    const detailsURL = `/${type}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=credits`;

    useEffect(() => {
        async function fetchDetails() {
            const request = await axios.get(detailsURL);
            setDetails(request.data);
            setMovieCast(request.data.credits.cast.filter((person) => person?.profile_path));
            setMovieDirector(request.data.credits.crew.find(person => {
                return person.job === "Director";
            }));
            
        }
        fetchDetails();
        setTvSeason(details?.seasons[0]?.season_number);
    }, [detailsURL]);
    console.log(tvSeason);

    useEffect(() => {
        async function fetchEpisodes() {
            const request = await axios.get(`/${type}/${movie.id}/season/${tvSeason}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
            setEpisodes(request.data.episodes);
        }
        fetchEpisodes();
    }, [type, movie.id, tvSeason])

    const navigate = useNavigate();
    const playClick = () => {
        if (type === 'tv')
            ref.current?.scrollIntoView({behavior: 'smooth'});
        else 
            navigate(`/watching/movie/${movie.id}`);
    }

    const linkStyle = {
        color: "white",
        textDecoration: "none",
        fontWeight: "bold"
    }
    return (
        <div className="overlay" 
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backgroundBlendMode: "overlay",
                backgroundSize: "cover",
                backgroundPosition: " center center"
            }}>
                <CancelIcon 
                    onClick={handleClose}
                    style={{
                        cursor: "pointer",
                        float: "right",
                        position: "sticky",
                        top: "10px",
                        right: "10px"
                    }}
                />
                <div className="description">
                    <div className="description__left">
                        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                        <button className="overlay__button" onClick={()=>{playClick()}}>Play</button>
                        <h3>{(type === 'movie') ? "Release Date: " + movie?.release_date : "First air date: " + details?.first_air_date}</h3>
                        <p>{truncate(movie?.overview, 300)}</p>
                    </div>
                    
                    <div className="description__right">
                        <div style={{
                        marginTop: "150px"
                        }}>
                            {(type === "movie") && (
                                <p>Director: &nbsp;<Link to={`/person/${movieDirector?.id}`} style={linkStyle}>{movieDirector?.name}</Link></p>
                            )}
                            
                            {(type === "tv") && (
                                <p>Created by: {details?.created_by.map((creator) => (<span><Link to={`/person/${creator.id}`} style={linkStyle}>{creator.name}, </Link>&nbsp;</span>))}</p>
                            )}
                            <p>Genres: {details?.genres.map((genre) => (
                                <span>
                                    <Link to={`/genre/${genre.id}`} style={linkStyle}>
                                        {genre.name}, 
                                    </Link>
                                    &nbsp;
                                </span>
                            ))}</p> 
                        </div>
                    </div>
                </div>
                
                <div className="casts">
                    <h2>Casts</h2>
                    <div className="casts__list">
                        {movieCast?.map((person) => (
                            <div className="actor" onClick={()=>{navigate(`/person/${person.id}`)}}>
                                <img
                                    className="actor__profileImg"
                                    src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                                    />
                                <p>{person.name || person.original_name}</p>
                                <p style={{
                                    color: "#999999"
                                }}>{person.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {(type === 'tv') && (
                    <div className="tvEpisodes" ref={ref}>
                        <div className="seasonBox">
                            <h2>Episodes</h2>
                            <select className="seasons" id="seasons" onChange={e => {setTvSeason(e.target.value)}}>
                                {details?.seasons.map((season) => (<option value={season.season_number}>{season.name}</option>))}
                            </select>
                        </div>
                        <div className="episodeList">
                            {episodes?.map((episode) => (
                                <div className="episode" onClick={()=>{navigate(`/watching/tv/${movie.id}/${tvSeason}/${episode.episode_number}`);}}>
                                    <h2>{episode.episode_number}</h2>
                                    <div className="episode__img">
                                        <img 
                                            src={`https://image.tmdb.org/t/p/original/${episode?.still_path}`}
                                            alt={`${episode.name}`}
                                        />
                                    </div>
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