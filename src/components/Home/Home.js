import Nav from "../Nav/Nav";
import Header from "../Header/Header";
import Row from "../Row/Row";
import requests from "../../requests/requests";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Home.css"

function Home() {
    const {param} = useParams();
    return (
        <div className="app">
            <Nav />
            {param === undefined && (
                <>
                    <Header />
                    <Row title='Trending Now' fetchURL={requests.fetchTrending} mediaType=""/>
                    <Row title='Action Movies' fetchURL={requests.fetchActionMovies} mediaType="movie"/>
                    <Row title='Adventure Movies' fetchURL={requests.fetchCrimeMovies} mediaType="movie"/>
                    <Row title='Crime Movies' fetchURL={requests.fetchActionMovies} mediaType="movie"/>
                    <Row title='Animation Movies' fetchURL={requests.fetchAnimationMovies} mediaType="movie"/>
                    <Row title='Action & Adventure TV Shows' fetchURL={requests.fetchActionTVShows} mediaType="tv"/>
                    <Row title='Comedy TV Shows' fetchURL={requests.fetchComedyTVShows} mediaType="tv"/>
                    <Row title='Family TV Shows' fetchURL={requests.fetchFamilyTVShows} mediaType="tv"/>
                    <Row title='Mystery TV Shows' fetchURL={requests.fetchMysteryTVShows} mediaType="tv"/>
                </>
            )}
            
            {(param === "tv") && (
                <div style={{
                    marginTop: "65px"
                }}>
                    <Row title='Action & Adventure TV Shows' fetchURL={requests.fetchActionTVShows} mediaType="tv"/>
                    <Row title='Comedy TV Shows' fetchURL={requests.fetchComedyTVShows} mediaType="tv"/>
                    <Row title='Family TV Shows' fetchURL={requests.fetchFamilyTVShows} mediaType="tv"/>
                    <Row title='Mystery TV Shows' fetchURL={requests.fetchMysteryTVShows} mediaType="tv"/>
                </div>
            )}

            {(param === "movies") && (
                <div style={{
                    marginTop: "65px"
                }}>
                    <Row title='Action Movies' fetchURL={requests.fetchActionMovies} mediaType="movie"/>
                    <Row title='Adventure Movies' fetchURL={requests.fetchCrimeMovies} mediaType="movie"/>
                    <Row title='Crime Movies' fetchURL={requests.fetchActionMovies} mediaType="movie"/>
                    <Row title='Animation Movies' fetchURL={requests.fetchAnimationMovies} mediaType="movie"/>
                </div>
            )}
            <Footer/>
            
        </div>
    );
}

export default Home;