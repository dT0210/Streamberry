import { useEffect, useState } from "react";
import axios from "../../requests/axios";
import { Dialog } from "@mui/material";
import Details from "../Details/Details";
import "./Row.css";

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

  const movieClick = (movie) => {
    setOpenDialog(true);
    setMovieDetails(movie);
  }

  return (
    <div className="row" style={{display: (movies.length === 0) && "none"}}>
      <h2>{title}</h2>
        <div className="row__posters">
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
      <Dialog
        fullWidth={true}
        open={openDialog}
        onClose={() => {setOpenDialog(false);}}
        scroll="body"
        maxWidth="lg"
        >
          <Details movie={movieDetails} mediaType = {mediaType} handleClose={() => {setOpenDialog(false);}}/>
      </Dialog>
    </div>
    
  );
}
  
export default Row;