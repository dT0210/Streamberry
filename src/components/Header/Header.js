import { React, useEffect, useState } from "react";
import axios from "../../requests/axios";
import requests from "../../requests/requests";
import { Dialog } from "@mui/material";
import Details from "../Details/Details";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Loading from "../Loading/Loading";

function Header() {
    const [movie, setMovie] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const URL = (movie?.media_type === 'movie') ? `/watching/movie/${movie.id}` : `/watching/tv/${movie.id}/1/1`;

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        async function fetchData() {
            await axios.get(requests.fetchTrending, {signal: controller.signal}).then((request) => {
                    setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            }).catch(() => {
                console.log("Request Failed!");
            }); 
        }
        fetchData();
        setLoading(false);
        return () => {
            controller.abort();
        }
    }, []);

    const MoreInfoClick = () => {
        setOpenDialog(true);
    }

    const truncate = (input) =>
        input?.length > 300 ? `${input.substring(0, 330)}..` : input;

    const navigate = useNavigate();
    const playClick = () => {
        navigate(URL);
    }
    if (loading) {
        return (
            <Loading
                addStyle={{
                position: "fixed",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                zIndex: "99999",
                }}
            />
        );
    }

    return (
        <header className="banner"
        style ={{
            backgroundImage: `linear-gradient(
                90deg,
                rgba(0, 0, 0, 1),
                rgba(0, 0, 0, 0.45)),url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
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
                <Details movie={movie} mediaType = {movie?.media_type} handleClose={() => {setOpenDialog(false);}}/>
            </Dialog>
        </header>
    );
}

export default Header;