import {
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom';

import Home from "./components/Home";
import Starting from './components/Starting';
import Movies from './components/Movies';
import TVShows from './components/TVShows';
import Details from './components/Details';
import requests from './requests/requests';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Starting/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/tvshows" element={<TVShows/>}/>
      </Routes>
    </Router>
  );
}

export default App;