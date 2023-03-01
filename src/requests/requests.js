const API_KEY = process.env.REACT_APP_TMDB_API_KEY 
const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US&`,
    fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,
    fetchPopularTVShows: `/tv/popular?api_key=${API_KEY}&language=en-US`,
    fetchLatestMovies: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
    fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchTopRatedTVShows: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchLatestTVShows: `/tv/on_the_air?api_key=${API_KEY}&language=en-US`,
    fetchTrendingMovies: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    fetchTrendingTVShows: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`,
    fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12&language=en-US`,
    fetchCrimeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=80&language=en-US`,
    fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=en-US`,
    fetchActionTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=10759&language=en-US`,
    fetchComedyTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=35&language=en-US`,
    fetchFamilyTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=10751&language=en-US`,
    fetchMysteryTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=9648&language=en-US`,
    fetchSearchResult: `/search/multi?api_key=${API_KEY}&language=en-US&query=`,
    fetchGenresMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=`,
    fetchGenresTVShows: `/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=`
}

export default requests;