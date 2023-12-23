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

    return (
        <div className="nav">
            <div className="nav__left">
                <Link to="/">
                    <img 
                        className="nav__logo"
                        src="/streamberry.png"
                        alt=""
                    />
                </Link>
                <Link to="/browse" className={`nav__link ${location.pathname === '/browse' ? 'active' : ''}`}>
                    <span className="nav__item">Home</span>
                </Link>
                <Link to="/browse/movies" className={`nav__link ${location.pathname === '/browse/movies' ? 'active' : ''}`}>
                    <span className="nav__item">Movies</span>
                </Link>
                <Link to="/browse/tv" className={`nav__link ${location.pathname === '/browse/tv' ? 'active' : ''}`}>
                    <span className="nav__item">TV Shows</span>
                </Link>
            </div>
            <div className="nav__right">
                <form
                    onSubmit={searchHandler}
                    className={showSearch ? "showSearch" : ""}
                >
                    <input
                        ref={inputField}
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
                src="streamberry_logo.png"
                alt=""
                />
            </div>
        </div>
    );
}

export default Nav;