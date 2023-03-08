const API_KEY = process.env.REACT_APP_TMDB_API_KEY 
const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchPopularTVShows: `/tv/popular?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchLatestMovies: `/movie/now_playing?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchTopRatedTVShows: `/tv/top_rated?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchLatestTVShows: `/tv/on_the_air?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchTrendingMovies: `/trending/movie/week?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchTrendingTVShows: `/trending/tv/week?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US&with_original_language=en|fr|es|ko`,
    fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12&language=en-US&with_original_language=en|fr|es|ko`,
    fetchCrimeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=80&language=en-US&with_original_language=en|fr|es|ko`,
    fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=en-US&with_original_language=en|fr|es|ko`,
    fetchActionTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=10759&language=en-US&with_original_language=en|fr|es|ko`,
    fetchComedyTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=35&language=en-US&with_original_language=en|fr|es|ko`,
    fetchFamilyTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=10751&language=en-US&with_original_language=en|fr|es|ko`,
    fetchMysteryTVShows: `/discover/tv?api_key=${API_KEY}&with_genres=9648&language=en-US&with_original_language=en|fr|es|ko`,
    fetchSearchResult: `/search/multi?api_key=${API_KEY}&with_original_language=en|fr|es|ko&language=en-US&query=`,
    fetchGenresMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko&with_genres=`,
    fetchGenresTVShows: `/discover/tv?api_key=${API_KEY}&language=en-US&with_original_language=en|fr|es|ko&with_genres=`
}

export default requests;