import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { useState } from "react";
import requests from "../../requests/requests";
import axios from "../../requests/axios"
import { useEffect } from "react";
import "./Person.css";
import Row from "../Row/Row"

function Person() {
    const {personId} = useParams();
    const [details, setDetails] = useState();
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const URL = `/person/${personId}?api_key=${API_KEY}&language=en-US`;
    //&append_to_response=movie_credits%2Ctv_credits

    useEffect(() => {
        async function fetchDetails() {
            const request = await axios.get(URL);
            setDetails(request.data);
            return request;
        }
        fetchDetails();
    }, [URL]);

    return (
        <div>
            <Nav/>
            <div className="person">
                <div className="overview">
                    <div className="overview__left">
                        <img
                            className="personImage"
                            src={`https://image.tmdb.org/t/p/original/${details?.profile_path}`}
                            alt=""
                            />
                        <div className="personalInfo">
                            <h3>Personal Info</h3>
                            <h4>Known for</h4>
                            <p>{details?.known_for_department}</p>
                            <h4>Gender</h4>
                            <p>{(details?.gender === 1) ? "Female" : "Male"}</p>
                            <h4>Birthday</h4>
                            <p>{details?.birthday}</p>
                            <h4>Place of Birth</h4>
                            <p>{details?.place_of_birth}</p>
                        </div>
                    </div>
                    <div className="overview__right">
                        <h1>{details?.name}</h1>
                        <h4>Biography</h4>
                        <p>{details?.biography}</p>
                        <div className="referenceList">
                            <Row title="Movies" fetchURL={`person/${personId}/movie_credits?api_key=${API_KEY}&language=en-US`} mediaType="movie"/>
                            <Row title="TV Shows" fetchURL={`person/${personId}/tv_credits?api_key=${API_KEY}&language=en-US`} mediaType="tv"/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
}

export default Person;