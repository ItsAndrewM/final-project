const {getAllGenres} = require('../utils/getAllGenres')

//get all genres for any possible movies
const handleGetAllGenres = (req, res) => {
        return getAllGenres()
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "Genres retrieved successfully!",
                    data: data.genres
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "Genres retrieved unsuccessfully!",
                    data: data.genres
                })
            }
        })
    }

module.exports = {handleGetAllGenres}