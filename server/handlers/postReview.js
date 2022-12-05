"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require("uuid");

const postReview = async (req, res) => {
    const {author_details, author, content, created_at, movie} = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const generatedId = uuidv4();

    try {
        const db = client.db('users');
        const db2 = client.db('reviews');
        if (author_details && author_details.avatar_path && author_details.rating && author && created_at && movie && content) {
            const userResult = await db.collection(author).find().toArray();
            const found = userResult.find((item) => {
                if (item.review) {
                    return item.review
                }
            })
            if (found) {
                found.review.push({...req.body, id: movie.id})
                const query = {_id: found._id}
                const newValues = { $set: {'review': found.review}}
                const addReview = await db.collection(author).updateOne(query, newValues);
                const result2 = await db2.collection(String(movie.id)).insertOne({...req.body, _id: generatedId});
                if (addReview.modifiedCount !== 0 && result2.acknowledged !== false) {
                    res.status(200).json({
                        status: 200,
                        message: `review for ${movie.title} made successfully`,
                        data: {review: [{...req.body, id: movie.id}], _id: generatedId}
                    })
                }
                else {
                    res.status(404).json({
                        status: 404, 
                        error: `review for ${movie.title} made unsuccessfully`,
                        data: {review: [{...req.body, id: movie.id}], _id: generatedId}
                    })
                }
            }
            else {
                const result = await db.collection(author).insertOne({review: [{...req.body, id: movie.id}], _id: generatedId});
                const result2 = await db2.collection(String(movie.id)).insertOne({...req.body, _id: generatedId});
                if (result.acknowledged !== false && result2.acknowledged !== false) {
                    res.status(200).json({
                        status: 200,
                        message: `review for ${movie.title} made successfully`,
                        data: {review: [{...req.body, id: movie.id}], _id: generatedId}
                    })
                }
            }
        }
        else {
            res.status(404).json({
                status: 404, 
                error: 'parameter is missing, try again',
                data: {review: [{...req.body, id: movie.id}], _id: generatedId}
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

module.exports = {postReview};