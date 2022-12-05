"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//function is for deleting an individual list item from an existing list instead of deleting an entire list
const deleteListItem = async (req, res) => {
    const {list_name, author_details, author, created_at, movie} = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    try {
        //connect to both the users db and the lists db
        const db = client.db('users');
        const db2 = client.db('lists');
        //check if the right body is included
        if (author_details && author && created_at && movie && list_name) {
            //verify existence of the lists in both the authors db and the lists collection
            const foundResult = await db.collection(author).findOne({lists: { $exists: [list_name]}})
            const listsResult = await db2.collection("lists").findOne({list_name: list_name, author: author})
            //if exists, move onto getting the _id from the authors document
            if (foundResult && listsResult) {
                const _id = foundResult._id
                const keys = Object.keys(foundResult.lists)
                const find = keys.find((item) => {
                    return item === list_name;
                })
                const foundMovie = foundResult.lists[find].find((item) => {
                    return item.movie.id === movie.id 
                })
                //the above is used to verify if the movie actually exists in the list queried by the user
                if (foundMovie) {
                    //instead of deleting the entire array the movie is in, pulling it from the array is the best course of action
                    const removeMovie = await db.collection(author).updateOne({_id: _id}, {$pull: {[`lists.${list_name}`]: {id: movie.id}}});
                    const removeListsCol = await db2.collection("lists").updateOne({list_name: list_name, author: author}, {$pull: {list: {id: movie.id}}});
                    //verify it worked, send response
                    if (removeMovie.modifiedCount !== 0 && removeListsCol.modifiedCount !== 0) {
                        res.status(200).json({
                            status: 200,
                            message: 'list item removed successfully',
                            data: {...req.body}
                        })
                    }
                    else {
                        res.status(404).json({
                            status: 404,
                            error: 'list item removed unsuccessfully',
                            data: {...req.body}
                        })
                    }
                }
                else {
                    res.status(404).json({
                        status: 404,
                        error: 'movie is not in that list',
                        data: {...req.body}
                    })
                }
            }
            else {
                res.status(404).json({
                    status: 404,
                    error: 'list does not exist',
                    data: {...req.body}
                })
            }
        }
        else {
            res.status(404).json({
                status: 404,
                error: 'param missing',
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

module.exports = {deleteListItem};