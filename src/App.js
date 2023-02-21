import {
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom';

import Home from "./components/Home";
import Starting from './components/Starting';
import SearchResult from './components/SearchResult';
import Player from './components/Player';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Starting/>}/>
        <Route path="/home" element = {<Home/>}/> 
        <Route path="/home/:param" element = {<Home/>}/>
        <Route path="/search/:query" element = {<SearchResult/>}/>
        <Route path="/watching/movie/:movieId" element = {<Player/>}/>
        <Route path="/watching/tv/:movieId" element = {<Player/>}/>
      </Routes>
    </Router>
  );
}

export default App;