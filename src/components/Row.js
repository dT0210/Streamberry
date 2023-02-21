import { useEffect, useRef, useState } from "react";
import axios from "../requests/axios";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import Details from "./Details";

function Row(props) {
  const [openDialog, setOpenDialog] = useState(false);

  const [movieDetails, setMovieDetails] = useState();

  const [movies, setMovies] = useState([]);

  const { title, fetchURL, mediaType, isSearch, SearchResult } = props;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    if (!isSearch){
      fetchData();
    } else {
      setMovies(SearchResult);
    }
  }, [fetchURL, isSearch, SearchResult]);

  const listRef = useRef();

  const [slideNumber, setSlideNumber] = useState(0);

  const arrowClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 20;
    if (direction === "left" && slideNumber > 0)
    {
      setSlideNumber(slideNumber-1);
      listRef.current.style.transform = `translateX(${176 + Math.ceil(distance)}px)`;
    }
    if (direction === "right" && slideNumber < 13)
    {
      setSlideNumber(slideNumber+1);
      listRef.current.style.transform = `translateX(${-176 + Math.ceil(distance)}px)`;
    }
  }

  const movieClick = (movie) => {
    setOpenDialog(true);
    setMovieDetails(movie);
  }

  return (
    <div className="row" style={{display: (movies.length === 0) && "none"}}>
      <h2>{title}</h2>
        <div className="wrapper">
          <ArrowBackIosOutlined className="sliderArrow leftArrow" onClick = {()=>arrowClick("left")} />
          <div className="row__posters" ref={listRef}>
            {movies.map((movie) => (
                <img
                  key={movie.id}
                  className="row__poster row__posterLarge"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.original_name}
                  onClick={()=>{movieClick(movie)}}
                />
            ))}
          </div>
          <ArrowForwardIosOutlined className="sliderArrow rightArrow" onClick = {()=>arrowClick("right")}/>
        </div>
        <Dialog
          fullWidth={true}
          open={openDialog}
          onClose={() => {setOpenDialog(false);}}
          scroll="body"
          maxWidth="lg"
          >
            <Details className="movieDetails" movie={movieDetails} mediaType = {mediaType} handleClose={() => {setOpenDialog(false);}}/>
        </Dialog>
    </div>
    
  );
}
  
export default Row;