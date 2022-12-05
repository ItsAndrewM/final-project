const request = require('request-promise');
require('dotenv').config()

const findPerson = async (person) => {
    return request(`https://api.themoviedb.org/3/search/person?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${person}`)
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

module.exports = {findPerson}
