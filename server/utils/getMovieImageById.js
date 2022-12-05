const request = require('request-promise');
require('dotenv').config()

const getMovieImageById = async (id) => {
    return request(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.API_KEY}`)
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

module.exports = {getMovieImageById}

