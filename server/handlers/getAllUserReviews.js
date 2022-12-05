"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
//function handles getting all reviews from the reviews collection. since theyre all individual documents, the find and to array are sufficient, no params or body necessary
const getAllUserReviews = async (req, res) => {
    const {id} = req.params;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    try {
        const db = client.db('reviews');
        if (id) {
            const result = await db.collection(id).find().toArray();
              if (result.length !== 0) {
                res.status(200).json({
                    status: 200,
                    message: `reviews for ${id} retreived successfully`,
                    data: result,
                })
            }
            else {
                res.status(404).json({                                          
                    status: 404,
                    data: result,
                    error: "unable to retrieve user reviews",
                })
            }
        }
        else {
            res.status(404).json({                                          
                status: 404,
                data: id,
                error: "parameter is missing, please try again",
            })
        }
    }
    catch (error) {
        return `ERROR: ${error}`;
    }
    finally {
        client.close();
    }
}

module.exports = {getAllUserReviews};