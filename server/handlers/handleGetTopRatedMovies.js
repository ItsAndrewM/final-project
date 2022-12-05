const {getTopRatedMovies} = require('../utils/getTopRatedMovies')

//getting the 20 top rated movies (of all time)
const handleGetTopRatedMovies = (req, res) => {
        return getTopRatedMovies()
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "Top rated movies retrieved successfully!",
                    data: data.results
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "Top rated movies retrieved unsuccessfully!",
                    data: data
                })
            }
        })
    }

module.exports = {handleGetTopRatedMovies}