const request = require('request-promise');
require('dotenv').config()

const findMovie = async (title) => {
    return request(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${title}`)
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

module.exports = {findMovie}

// findMovie('jack reacher').then((data) => console.log(data.results))