import React, { useState, useEffect, useRef } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "../../requests/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Details.css";

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

    var type;
    if (props.mediaType === "")
        type = movie.media_type;
    else
        type = props.mediaType;

    const detailsURL = `/${type}/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=credits`;

    useEffect(() => {
        const controller = new AbortController();
        async function fetchDetails() {
            await axios.get(detailsURL, {signal: controller.signal}).then((request) => {
                setDetails(request.data);
                setMovieCast(request.data.credits.cast.filter((person) => person?.profile_path));
                setMovieDirector(request.data.credits.crew.find(person => {
                    return person.job === "Director";
                }));
            }).catch(() => {
                console.log("Details Request Failed!");
            });
        }
        fetchDetails();
        return () => {
            controller.abort();
        }
    }, [type, detailsURL]);
    console.log(movie?.media_type);
    useEffect(() => {
        const controller = new AbortController();
        async function fetchEpisodes() {
            await axios.get(`/${type}/${movie.id}/season/${tvSeason}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`, {signal: controller.signal})
            .then((request) => {
                setEpisodes(request.data.episodes);
            })
        }
        fetchEpisodes();
        return () => {
            controller.abort();
        }
    }, [type, movie.id, tvSeason])

    const navigate = useNavigate();
    const playClick = () => {
        if (type === 'tv')
            ref.current?.scrollIntoView({behavior: 'smooth'});
        else 
            navigate(`/watching/movie/${movie.id}`);
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
                        {(type === 'movie') && (
                            <h3>
                                <span>Release date: {movie?.release_date}</span>
                                <span style={{float: "right"}}>{details?.runtime/60 >> 0}h {details?.runtime%60}m</span>
                            </h3>
                        )}   
                        {(type === 'tv') && (
                            <h3>First air date: {details?.first_air_date}</h3>
                        )}
                        <p>{truncate(movie?.overview, 300)}</p>
                    </div>
                    
                    <div className="description__right">
                        <div style={{
                        marginTop: "150px"
                        }}>
                            {(type === "movie") && (
                                <p>Director: &nbsp;<Link to={`/person/${movieDirector?.id}`} className="link">{movieDirector?.name}</Link></p>
                            )}
                            
                            {(type === "tv") && (
                                <p>Created by: {details?.created_by?.map((creator) => (<span><Link to={`/person/${creator.id}`} className="link">{creator.name}</Link>,&nbsp;</span>))}</p>
                            )}
                            <p>Genres: {details?.genres.map((genre) => (
                                <span>
                                    <Link to={`/genre/${genre.id}`} className="link">
                                        {genre.name}
                                    </Link>
                                    ,&nbsp;
                                </span>
                            ))}</p> 
                        </div>
                    </div>
                </div>
                
                <div className="casts">
                    <h2>Casts</h2>
                    <div className="casts__list">
                        {movieCast?.map((person) => (
                            <Link to={`/person/${person.id}`} className="actor link">
                                <img
                                    className="actor__profileImg"
                                    src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                                    alt=""
                                />
                                <p>{person.name || person.original_name}</p>
                                <p className="silver">{person.character}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                {(type === 'tv') && (
                    <div className="tvEpisodes" ref={ref}>
                        <div className="seasonBox">
                            <h2>Episodes</h2>
                            <select className="dropdownBox" id="seasons" defaultValue={1} onChange={e => {setTvSeason(e.target.value)}}>
                                {details?.seasons.filter((season)=>{return season.season_number !==0;}).map((season) => (<option value={season.season_number}>{season.name}</option>))}
                            </select>
                        </div>
                        <div className="line" style={{marginTop: "50px"}}/>
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
                                        <h4>{episode.name}</h4>
                                        <p className="silver">{truncate(episode.overview, 200)}</p>
                                    </div>
                                </div>))}
                            {(episodes?.length === 0) && (
                                <p>No episodes available.</p>
                            )}
                        </div>
                    </div>
                )}
                
        </div>
    );
}

export default Details;