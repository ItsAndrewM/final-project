const {findPerson} = require('../utils/findPerson')

//function used for searching for a person (cast or crew)
const handleFindPerson = (req, res) => {
    const {person} = req.params;
    if (person) {
        return findPerson(person)
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

module.exports = {handleFindPerson}