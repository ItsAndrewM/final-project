const {getUpcomingMovies} = require('../utils/getUpcomingMovies')

//getting all currently upcoming, not yet released movies
const handleGetUpcomingMovies = (req, res) => {
        return getUpcomingMovies()
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "Upcoming movies retrieved successfully!",
                    data: data.results
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "Upcoming movies retrieved unsuccessfully!",
                    data: data
                })
            }
        })
    }

module.exports = {handleGetUpcomingMovies}