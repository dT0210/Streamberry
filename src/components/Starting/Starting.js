import { useNavigate } from "react-router-dom";
import "./Starting.css";
import "../Nav/Nav.css";

function Starting() {
    const navigate = useNavigate();
    const btnClicked = () => {
        navigate('/home', {replace: true});
    }
    return (
        <div className="main">
            <div className="nav">
                <div className="nav__left">
                    <img 
                        className="nav__logo"
                        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
                        alt=""
                    />
                </div>
                <img 
                    className="nav__avatar"
                    src="http://pngimg.com/uploads/netflix/netflix_PNG8.png"
                    alt=""
                />
            </div>
            <div className="starting-body">
                <h1>WATCH YOUR FAVORITE MOVIES AND TV SHOWS</h1>
                <button className="starting-body__watch-button" onClick={btnClicked}>Watch now</button>
            </div>            
        </div>
    );
}

export default Starting;