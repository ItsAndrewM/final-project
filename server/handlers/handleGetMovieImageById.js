const {getMovieImageById} = require('../utils/getMovieImageById')

//if images are required, use this function to get images using a movie id
const handleGetMovieImageById = (req, res) => {
    const {id} = req.params;
    if (id) {
        return getMovieImageById(id)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "movie retrieved successfully!",
                    data: data
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "movie retrieved unsuccessfully!",
                    data: data
                })
            }
        })
    }
    else {
        res.status(404).json({
            status: 404,
            error: 'parameter missing, please try again',
            data: id
        })
    }

}

module.exports = {handleGetMovieImageById}