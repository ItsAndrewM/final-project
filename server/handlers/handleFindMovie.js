const {findMovie} = require('../utils/findMovie')

//function is called when querying a movie title by using it's title
//used to handle searches
const handleFindMovie = (req, res) => {
    const {movie} = req.params;
    if (movie) {
        return findMovie(movie)
        .then((data) => {
            if (data.results.length !== 0) {
                res.status(200).json({
                    status: 200,
                    message: `there are ${data.results.length} results`,
                    data: data.results
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: `there were ${data.results.length} results`,
                    data: data.results
                })
            }
        })
    }
    else {
        res.status(404).json({
            status: 404,
            error: 'parameter missing, please try again',
            data: movie
        })
    }
}

module.exports = {handleFindMovie}