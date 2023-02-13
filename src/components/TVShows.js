import Nav from "./Nav";
import Row from "./Row";
import requests from "../requests/requests";

function TVShows() {
    return (
        <div className="app">
            <Nav />
            <Row title='Action TV Shows' fetchURL={requests.fetchActionTVShows}/>
            <Row title='Comedy TV Shows' fetchURL={requests.fetchComedyTVShows}/>
            <Row title='Family TV Shows' fetchURL={requests.fetchFamilyTVShows}/>
            <Row title='Mystery TV Shows' fetchURL={requests.fetchMysteryTVShows}/>
        </div>
    );
}

export default TVShows;