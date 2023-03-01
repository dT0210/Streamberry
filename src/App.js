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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Starting/>}/>
        <Route path="/home" element={<Home/>}/> 
        <Route path="/home/:param" element={<Home/>}/>
        <Route path="/search/:query" element={<SearchResult/>}/>
        <Route path="/watching/:type/:movieId/:season?/:episode?" element={<Player/>}/>
        <Route path="/person/:personId" element={<Person/>}/>
      </Routes>
    </Router>
  );
}

export default App;