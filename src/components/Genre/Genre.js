import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import requests from "../../requests/requests";
import Nav from "../Nav/Nav";
import Row from "../Row/Row";
import "./Genre.css"
import genre from "../../tmdb/genre";

function Genre() {
    const {genreID} = useParams();
    const [type, setType] = useState('movie');
    const [URL, setURL] = useState('');

    useEffect(() => {
        if (type === 'movie')
        {
            setURL(`${requests.fetchGenresMovies}${genreID}`);
        }
        else {
            setURL(`${requests.fetchGenresTVShows}${genreID}`);
        }
    }, [type, genreID])

    return (
        <div>
            <Nav/>
            <div className="genre">
                <div className="title">
                    <h1 className="white">{genre(genreID)}</h1>
                    <select className="dropdownBox" onChange={e => {setType(e.target.value)}}>
                        <option value='movie'>Movies</option>
                        <option value='tv'>TV Shows</option>
                    </select>
                </div>
                <div className="line"/>
                <div className="rows">
                    <Row title="Trending" fetchURL={`${URL}&sort_by=popularity.desc&page=1`} mediaaType={type}/>
                    <Row title="Latest" fetchURL={`${URL}&sort_by=release_date.desc&vote_count.gte=10&page=1`} mediaType={type}/>
                    <Row title="Originals" fetchURL={`${URL}&sort_by=original_title.desc&vote_count.gte=10&page=1`} mediaType={type}/>
                    <Row title="Recommended" fetchURL={`${URL}&sort_by=vote_count.desc&page=1`} mediaType={type}/>
                </div>
            </div>
        </div>
    );
}

export default Genre;