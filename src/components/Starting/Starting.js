import { useNavigate } from "react-router-dom";
import "./Starting.css";
import "../Nav/Nav.css";

function Starting() {
    const navigate = useNavigate();
    const btnClicked = () => {
        navigate('/browse', {replace: true});
    }
    return (
        <div className="main">
            <div className="nav">
                <div className="nav__left">
                    <img 
                        className="nav__logo"
                        src="streamberry.png"
                        alt=""
                    />
                </div>
                <img 
                    className="nav__avatar"
                    src="streamberry_logo.png"
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