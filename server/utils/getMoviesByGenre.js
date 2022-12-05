const request = require('request-promise');
require('dotenv').config()

const getMoviesByGenre = async (genre) => {
    return request(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${genre}`)
    .then((data) => {
        return JSON.parse(data);
    })
    .then((parsedData) => {
        return parsedData;
    })
    .catch((error) => {
        return error;
    })
};

module.exports = {getMoviesByGenre}

