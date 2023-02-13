import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Search } from "@mui/icons-material";
import { Clear } from "@mui/icons-material";

function Nav() {
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const inputField = useRef(null);
    const navigate = useNavigate();
    const logoClicked = () => {
        navigate('/', {replace: true});   
    } 

    const homeClicked = () => {
        navigate('/home', {replace: true});
    }

    const moviesClicked = () => {
        navigate('/movies', {replace: true});
    }

    const tvshowsClicked = () => {
        navigate('/tvshows', {replace: true});
    }

    const location = useLocation();

    useEffect(() =>
    {
        if (location.pathname === '/home') {
            document.getElementsByClassName('nav__home')[0].style.fontWeight = "bolder";
        }
        if (location.pathname === '/movies') {
            document.getElementsByClassName('nav__movies')[0].style.fontWeight = "bolder";
        }
        if (location.pathname === '/tvshows') {
            document.getElementsByClassName('nav__shows')[0].style.fontWeight = "bolder";
        }
    }, [location])

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${query}`);
        setQuery("");
    }

    return (
        <div className="nav false">
            <div className="nav__left">
                <img 
                    className="nav__logo"
                    src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
                    alt=""
                    onClick={logoClicked}
                />
                <span className="nav__home" onClick={homeClicked}>Home</span>
                <span className="nav__movies" onClick={moviesClicked}>Movies</span>
                <span className="nav__shows" onClick={tvshowsClicked}>TV Shows</span>
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
                        required
                        placeholder="Titles, name ..."
                        type="search"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}/>
                    <Search
                        style={
                        //icon on search field
                            showSearch ? { zIndex: "1" } : { display: "none" }
                        }
                        className="searchIcon"
                    />
                    {query && <Clear className="searchCross" />}
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