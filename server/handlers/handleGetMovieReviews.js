const {getMovieReviews} = require('../utils/getMovieReviews');
const {randomNum} = require('../utils/randomNum');

//getting all movie reviews for a movie
const handleGetMovieReviews = (req, res) => {
    const {id} = req.params;
    if (id) {
        return getMovieReviews(id)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "reviews retrieved successfully!",
                    data: data.results
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "reviews retrieved unsuccessfully!",
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

module.exports = {handleGetMovieReviews}