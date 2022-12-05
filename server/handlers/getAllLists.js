"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//function handles getting all lists from the lists collection. since theyre all individual documents, the find and to array are sufficient, no params or body necessary
const getAllLists = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        console.log('connected')
        const db = client.db('lists');
        const result = await db.collection('lists').find().toArray();
        if (result) {
            res.status(200).json({
                status: 200,
                message: 'all lists retrieved successfully',
                data: result
            })
        }
        else {
            res.status(404).json({                                          
                status: 404,
                data: result,
                error: "unable to retrieve lists",
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

module.exports = {getAllLists};