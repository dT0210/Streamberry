const API_KEY = process.env.REACT_APP_TMDB_API_KEY 
const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
    fetchCrimeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
    fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchActionTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    fetchComedyTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchFamilyTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
    fetchMysteryTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
}

export default requests;