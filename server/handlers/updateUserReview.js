"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const updateUserReview = async (req, res) => {
    const {author_details, author, content, created_at, movie, id} = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    try {
        const db = client.db('users');
        const db2 = client.db('reviews');
        if (author_details && author && created_at && movie && content && id) {
            const userResult = await db.collection(author).findOne({review: {$elemMatch: { id: movie.id}}});
            const updateReviews = await db2.collection(String(movie.id)).findOne({author: author});
            const reviews_id = updateReviews._id;
            const _id = userResult._id;
            const result = await db.collection(author).updateOne({_id: _id, "review.id": movie.id}, { $set: {"review.$.content": content }})
            const reviewsResult = await db2.collection(String(movie.id)).updateOne({_id: reviews_id}, { $set: {"content": content }})
                if (result.modifiedCount === 1 && reviewsResult.modifiedCount === 1) {
                    res.status(200).json({
                        status: 200,
                        message: `review for ${movie.title} updated successfully`,
                        data: {...req.body}
                    })
                }   
                else {
                    res.status(200).json({
                        status: 200,
                        message: `review for ${movie.title} updated unsuccessfully`,
                        data: {...req.body}
                    })
                }
            }
        else {
            res.status(404).json({
                status: 404, 
                error: 'parameter is missing, try again',
                data: {...req.body}
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

module.exports = {updateUserReview};