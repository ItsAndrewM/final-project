const {getRecommendedMovie} = require('../utils/getRecommendedMovie')
const {randomNum} = require('../utils/randomNum')

//using a movie's id, this function fetches 20 recommended movies
const handleGetAllRecommendedMovie = (req, res) => {
    const {id} = req.params;
    if (id) {
        return getRecommendedMovie(id)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "Reccommended movies retrieved successfully!",
                    data: data.results
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "Reccommended movies retrieved unsuccessfully!",
                    data: data.results
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

module.exports = {handleGetAllRecommendedMovie}