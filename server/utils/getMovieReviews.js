const request = require('request-promise');
require('dotenv').config()

const getMovieReviews = async (id) => {
    return request(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.API_KEY}&language=en-US&page=1`)
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

module.exports = {getMovieReviews}

