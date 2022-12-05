const request = require('request-promise');
require('dotenv').config()

const getMovieCreditsById = async (id) => {
    return request(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`)
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

module.exports = {getMovieCreditsById}

