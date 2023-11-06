import { useEffect, useState } from "react";
import axios from "../../requests/axios";
import { Dialog } from "@mui/material";
import Details from "../Details/Details";
import "./Row.css";
import Loading from "../Loading/Loading";

function Row(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [movieDetails, setMovieDetails] = useState();
  const [movies, setMovies] = useState([]);
  const { title, fetchURL, mediaType, isSearch, SearchResult } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    async function fetchData() {
      await axios.get(fetchURL, {signal: controller.signal}).then((request) => {
          setMovies((request.data.results || request.data.cast).filter((movie)=> movie?.poster_path && movie?.backdrop_path));
      }).catch(() => {
        console.log("Request Failed!");
      });
    }
    if (!isSearch){
      fetchData();
    } else {
      setMovies(SearchResult);
    }
    setLoading(false);
    return () => {
      controller.abort();
    }
  }, [fetchURL, isSearch, SearchResult]);

  const movieClick = (movie) => {
    console.log(movie);
    setOpenDialog(true);
    setMovieDetails(movie);
  }

  if (movies?.length === 0) {
    return <></>;
  }

  if (loading) {
    return (
      <Loading
        addStyle={{
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          zIndex: "99999",
        }}
      />
    );
  }

  return (
    <div className="row">
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
        maxWidth="false"
      >
        <Details movie={movieDetails} mediaType = {mediaType} handleClose={() => {setOpenDialog(false);}}/>
      </Dialog>
    </div>
  );
}
  
export default Row;