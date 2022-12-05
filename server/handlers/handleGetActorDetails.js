const {getActorDetails} = require('../utils/getActorDetails')

//using a persons id, function fetches data about that person
const handleGetActorDetails = (req, res) => {
    const {id} = req.params;
    if (id) {
        return getActorDetails(id)
        .then((data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    message: "actor retrieved successfully!",
                    data: data
                })
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: "actor retrieved unsuccessfully!",
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

module.exports = {handleGetActorDetails}