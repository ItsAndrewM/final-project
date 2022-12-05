"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const deleteUserReview = async (req, res) => {
    const {author_details, author, content, created_at, movie, id} = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    //connect to users collection and the reviews collection
    try {
        const db = client.db('users');
        const db2 = client.db('reviews');
        //verify all params are accounted for through the body
        if (author_details && author && created_at && movie && content && id) {
            //attempt to find the review document in the users collection
            const userResult = await db.collection(author).findOne({review: {$elemMatch: { id: movie.id}}});
            //use the movie id to locate the review in the reviews collection
            const updateReviews = await db2.collection(String(movie.id)).findOne({author: author});
            const reviews_id = updateReviews._id;
            const _id = userResult._id;
            //from the above, use the id's found to query updateing/deleting the reviews from the collections
            const result = await db.collection(author).updateOne({_id: _id}, { $pull: {"review": {"id": movie.id}}})
            const reviewsResult = await db2.collection(String(movie.id)).deleteOne({_id: reviews_id})
            //verify it works, send response
                if (result.modifiedCount === 1 && reviewsResult.deletedCount === 1) {
                    res.status(200).json({
                        status: 200,
                        message: `review for ${movie.title} deleted successfully`,
                        data: {...req.body}
                    })
                }   
                else {
                    res.status(200).json({
                        status: 200,
                        message: `review for ${movie.title} deleted unsuccessfully`,
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

module.exports = {deleteUserReview};