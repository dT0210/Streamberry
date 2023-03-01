import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { Search } from "@mui/icons-material";
import { Clear } from "@mui/icons-material";
import "./Nav.css";

function Nav() {
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const inputField = useRef(null);
    const navigate = useNavigate();

    const location = useLocation();

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${query}`);
        setQuery("");
    }

    const linkStyle = {
        color: "#d6cccc",
        textDecoration: "none"
    }

    return (
        <div className="nav false">
            <div className="nav__left">
                <Link to="/">
                    <img 
                        className="nav__logo"
                        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
                        alt=""
                    />
                </Link>
                <Link to="/home" style={linkStyle}>
                    <span className="nav__home"
                        style={location.pathname === '/home' ? {color: "white"} : {}}
                        >Home</span>
                </Link>
                <Link to="/home/movies" style={linkStyle}>
                    <span className="nav__movies"
                        style={location.pathname === '/home/movies' ? {color: "white"} : {}}
                        >Movies</span>
                </Link>
                <Link to="/home/tv" style={linkStyle}>
                    <span className="nav__shows"
                        style={location.pathname === '/home/tv' ? {color: "white"} : {}}
                        >TV Shows</span>
                </Link>
            </div>
            <div className="nav__right">
                <form
                    onSubmit={searchHandler}
                    className={showSearch ? "showSearch" : ""}
                >
                    <input
                        ref={inputField}
                        //hide search field if not in focus and clear the text entered.
                        onBlur={() => {
                        setQuery("");
                        setShowSearch(false);
                        }}
                        id="Search"
                        required
                        placeholder="Titles, name ..."
                        type="search"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}/>
                    <Search
                        style={
                            showSearch ? { zIndex: "1" } : { display: "none" }
                        }
                        className="searchIcon"
                    />
                    {query && <Clear className="searchCross"/>}
                </form>
                <Search
                //search icon get hidden when clicked
                    style={
                        !showSearch
                        ? { animation: "zoomAnimation 0.8s" }
                        : { visibility: "hidden" }
                    }
                    onClick={() => {
                        setShowSearch(true);
                        inputField.current.focus();
                }}
                />

                <img 
                className="nav__avatar"
                src="http://pngimg.com/uploads/netflix/netflix_PNG8.png"
                alt=""
                />
            </div>
        </div>
    );
}

export default Nav;