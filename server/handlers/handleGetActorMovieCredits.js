const {getActorMovieCredits} = require('../utils/getActorMovieCredits')

//using an id, collect all acting/crew credits for an individual
const handleGetActorMovieCredits = (req, res) => {
    const {id} = req.params;
    if (id) {
        return getActorMovieCredits(id)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "actor credits retrieved successfully!",
                    data: data
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "actor credits retrieved unsuccessfully!",
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

module.exports = {handleGetActorMovieCredits}