const {getMovieById} = require('../utils/getMovieById')

//using a movies id, get more information regarding that movie (post, overview, etc)
const handleGetMovieById = (req, res) => {
    const {id} = req.params;
    if (id) {
        return getMovieById(id)
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

module.exports = {handleGetMovieById}