const {getRecommendedMovie} = require('../utils/getRecommendedMovie')
const {randomNum} = require('../utils/randomNum')

//getting 20 recommended movies but returning 5 of them to display with a specific movie
const handleGetRecommendedMovie = (req, res) => {
    const {id} = req.params;
    if (id) {
        return getRecommendedMovie(id)
        .then((data) => {
            if (data) {
                const resultArr = [];
                let count = 0;
                data.results.forEach((ele) => {
                    //function to get 5 movies from 5 random indexes
                    const randomItem = data.results[randomNum(data.results.length)]
                    if (!resultArr.find(item => item.id === randomItem.id)) {
                        count++;
                        if (count < 6) {
                            resultArr.push(randomItem)
                        }
                    }
                })
                res.status(200).json({
                    status: 200,
                    message: "Reccommended movies retrieved successfully!",
                    data: resultArr
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

module.exports = {handleGetRecommendedMovie}