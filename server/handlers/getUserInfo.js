"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//function to be used to get all the documents in the users collection: seen, lists and reviews
const getUserInfo = async (req, res) => {
    const {user} = req.params;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    try {
        const db = client.db('users');
        if (user) {
            const result = await db.collection(user).find().toArray();
            if (result.length !== 0) {
                res.status(200).json({
                    status: 200,
                    message: "info retreived successfully",
                    data: result,
                })
            }
            else {
                res.status(404).json({                                          
                    status: 404,
                    data: result,
                    error: "unable to retrieve user info",
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

module.exports = {getUserInfo};