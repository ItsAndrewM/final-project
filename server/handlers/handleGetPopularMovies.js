const {getPopularMovies} = require('../utils/getPopularMovies')

//get 20 popular movies 
const handleGetPopularMovies = (req, res) => {
        return getPopularMovies()
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "Popular movies retrieved successfully!",
                    data: data.results
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "Popular movies retrieved unsuccessfully!",
                    data: data
                })
            }
        })
    }

module.exports = {handleGetPopularMovies}