import Nav from "./Nav";
import Header from "./Header";
import Row from "./Row";
import requests from "../requests/requests";
import { useParams } from "react-router-dom";

function Home() {
    const {param} = useParams();
    return (
        <div className="app">
            <Nav />
            <Header />
            <Row title='Trending Now' fetchURL={requests.fetchTrending}/>
            <Row title='Action Movies' fetchURL={requests.fetchActionMovies}/>
            <Row title='Adventure Movies' fetchURL={requests.fetchCrimeMovies}/>
            <Row title='Crime Movies' fetchURL={requests.fetchActionMovies}/>
            <Row title='Animation Movies' fetchURL={requests.fetchAnimationMovies}/>
            <Row title='Action TV Shows' fetchURL={requests.fetchActionTVShows}/>
            <Row title='Comedy TV Shows' fetchURL={requests.fetchComedyTVShows}/>
            <Row title='Family TV Shows' fetchURL={requests.fetchFamilyTVShows}/>
            <Row title='Mystery TV Shows' fetchURL={requests.fetchMysteryTVShows}/>
        </div>
    );
}

export default Home;