import { useEffect, useState } from "react";
import React from "react";
import axios from "../../requests/axios";
import requests from "../../requests/requests";
import { Dialog } from "@mui/material";
import Details from "../Details/Details";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const [movie, setMovie] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending); 
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            );
        }
        fetchData();
    }, []);

    const MoreInfoClick = () => {
        setOpenDialog(true);
    }

    const truncate = (input) =>
        input?.length > 300 ? `${input.substring(0, 330)}..` : input;

    const navigate = useNavigate();
    const playClick = () => {
        navigate(`/watching/${movie.media_type}/${movie.id}`);
    }

    return (
        <header className="banner"
        style ={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backgroundBlendMode: "overlay",
        }}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button" onClick={playClick}>Play</button>
                    <button className="banner__button" onClick={MoreInfoClick}>More info</button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview)}
                </h1>
            </div>
            <Dialog
                fullWidth={true}
                open={openDialog}
                onClose={() => {setOpenDialog(false);}}
                scroll="body"
                maxWidth="lg"
                >
                <Details movie={movie} mediaType = {movie.media_type} handleClose={() => {setOpenDialog(false);}}/>
            </Dialog>
        </header>
    );
}

export default Header;