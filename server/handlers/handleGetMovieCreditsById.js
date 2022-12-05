const {getMovieCreditsById} = require('../utils/getMovieCreditsById')

//function to handle getting a movies credits using the movies id
const handleGetMovieCreditsById = (req, res) => {
    const {id} = req.params;
    if (id !== undefined) {
        return getMovieCreditsById(id)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "movie credits retrieved successfully!",
                    data: data
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "movie credits retrieved unsuccessfully!",
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

module.exports = {handleGetMovieCreditsById}