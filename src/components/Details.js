import React, { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "../requests/axios";
import { useEffect } from "react";
import genre from "../tmdb/convertGenres";
import { useNavigate } from "react-router-dom";

function Details(props) {
    const movie = props.movie;
    const handleClose = props.handleClose;
    const truncate = (input) =>
        input?.length > 300 ? `${input.substring(0, 330)}..` : input;
    
    const [movieCast, setMovieCast] = useState();
    const [movieDirector, setMovieDirector] = useState();

    let type;
    if (props.mediaType === "")
        type = movie.media_type;
    else
        type = props.mediaType;

    const URL = `/${type}/${movie.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
    
    useEffect(() => {
        async function fetchCredits() {
            const request = await axios.get(URL);
            setMovieDirector(request.data.crew.find(person => {
                return person.job === "Director";
            }));
            setMovieCast(request.data.cast);
            
        }
        fetchCredits();
    }, [URL])

    const navigate = useNavigate();
    const playClick = () => {
        navigate(`/watching/${type}/${movie.id}`);
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
                <div className="overlay__left">
                    <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                    <button className="banner__button" onClick={()=>{playClick()}}>Play</button>
                    <h3>Release Date: {movie?.release_date}</h3>
                    <p>{truncate(movie?.overview)}</p>
                </div>
                
                <div className="overlay__right">
                    <CancelIcon 
                        onClick={handleClose}
                        style={{
                            cursor: "pointer",
                            float: "right",
                            marginTop: "10px"
                        }}
                    />
                    {(movieCast !== undefined) && (
                        <div style={{
                        marginTop: "150px"
                        }}>
                            {(type === "movie") && (
                                <p>Director: <span>{movieDirector.name}</span></p>
                            )}
                            <p>Cast: <span>{movieCast[0]?.name}, {movieCast[1]?.name}, {movieCast[2]?.name}</span></p>
                            <p>Genres: {movie.genre_ids.map((id) => (<span>{genre(id)}, </span>))}</p>
                        </div>
                    )}
                </div>
                
        </div>
    );
}

export default Details;