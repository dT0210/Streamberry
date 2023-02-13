import Nav from "./Nav";
import Row from "./Row";
import requests from "../requests/requests";

function Movies() {
    return (
        <div className="app">
            <Nav />
            <Row title='Action Movies' fetchURL={requests.fetchActionMovies}/>
            <Row title='Adventure Movies' fetchURL={requests.fetchCrimeMovies}/>
            <Row title='Crime Movies' fetchURL={requests.fetchActionMovies}/>
            <Row title='Animation Movies' fetchURL={requests.fetchAnimationMovies}/>
        </div>
    );
}

export default Movies;