import { useParams } from "react-router-dom";
import axios from "../../requests/axios"
import Nav from "../Nav/Nav";
import Row from "../Row/Row";

function Genre() {

    return (
        <div>
            <Nav/>
            <div className="genre">
                <div className="movies">
                    
                </div>
                <div className="tvshows">

                </div>
            </div>
        </div>
    );
}

export default Genre;