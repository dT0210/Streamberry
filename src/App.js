import {
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom';

import Home from "./components/Home/Home";
import Starting from './components/Starting/Starting';
import SearchResult from './components/SearchResult/SearchResult';
import Player from './components/Player/Player';
import Person from './components/Person/Person';
import Genre from './components/Genre/Genre';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Starting/>}/>
        <Route exact path="/home" element={<Home/>}/> 
        <Route exact path="/home/:param" element={<Home/>}/>
        <Route exact path="/search/:query" element={<SearchResult/>}/>
        <Route exact path="/watching/:type/:movieId/:season?/:episode?" element={<Player/>}/>
        <Route exact path="/person/:personId" element={<Person/>}/>
        <Route exact path="/genre/:genreID" element={<Genre/>}/>
      </Routes>
    </Router>
  );
}

export default App;