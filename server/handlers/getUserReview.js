"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//function to get a users reviews
const getUserReview = async (req, res) => {
    const {user} = req.params;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    try {
        const db = client.db('users');
        if (user) {
            const result = await db.collection(user).find().toArray();
            const found = result.find((item) => {
                if (item.review) {
                    return item.review
                }
            })
            if (found) {
                res.status(200).json({
                    status: 200,
                    message: "info reviews retreived successfully",
                    data: found.review,
                })
            }
            else {
                res.status(404).json({                                          
                    status: 404,
                    data: found.review,
                    error: "unable to retrieve user reviews",
                })
            }
        }
        else {
            res.status(404).json({                                          
                status: 404,
                data: user,
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

module.exports = {getUserReview};