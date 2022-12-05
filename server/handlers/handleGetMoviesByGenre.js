const {getMoviesByGenre} = require('../utils/getMoviesByGenre')

//getting all movies based on a specific genre id
const handleGetMovieByGenre = (req, res) => {
    const {genre} = req.params;
    if (genre) {
        return getMoviesByGenre(genre)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "movies by genre retrieved successfully!",
                    data: data.results
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "movies by genre retrieved unsuccessfully!",
                    data: data.results
                })
            }
        })
    }
    else {
        res.status(404).json({
            status: 404,
            error: 'parameter missing, please try again',
            data: genre
        })
    }
    
}

module.exports = {handleGetMovieByGenre}