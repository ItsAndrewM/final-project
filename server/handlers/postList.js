"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require("uuid");

//function to post an item to a list and will also handle if a list exists or not
const postList = async (req, res) => {
    const {list_name, author_details, author, created_at, movie} = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const generatedId = uuidv4();

    try {
        //connect ot both users and lists collections
        const db = client.db('users');
        const db2 = client.db('lists');
        //check for the existence of the body
        if (author_details && author && created_at && movie && list_name) {
            const insertData = {_id: generatedId, lists: {[list_name]: [{author_details: author_details, author: author, id: movie.id, created_at: created_at, movie: movie}]}}
            //attempt to find the lists in the authors collection and in the lists collection
            const foundResult = await db.collection(author).findOne({lists: { $exists: [list_name]}})
            const listsResult = await db2.collection("lists").findOne({list_name: list_name, author: author})
            if (foundResult && listsResult) {
                //if it exists, get the id and then check if the list name exists by converting keys to an array and then looking in that arrays object for the movie
                const _id = foundResult._id
                const keys = Object.keys(foundResult.lists)
                const find = keys.find((item) => {
                    return item === list_name;
                })
                const foundMovie = foundResult.lists[find].find((item) => {
                    return item.movie.id === movie.id 
                })
                //if the movie exists in the list then refuse to push the movie into the list
                if (foundMovie) {
                    res.status(404).json({
                        status: 404,
                        error: 'movie exists in list already',
                        data: {...req.body}
                    })
                }
                else {
                    //otherwise updat the list with the new movie by pushing into that array
                    const insertListsCol = await db2.collection("lists").updateOne({list_name: list_name, author: author}, {$push : {list: {
                        id: movie.id, 
                        movie: movie
                    }}})
                    const insert = await db.collection(author).updateOne({_id: _id}, {$push: {[`lists.${list_name}`]: {author_details: author_details, 
                        author: author,
                        id: movie.id, 
                        created_at: created_at, 
                        movie: movie
                    }}})
                    //check if successful
                    if (insert.modifiedCount !== 0 && insertListsCol.modifiedCount !== 0) {
                        res.status(200).json({
                            status: 200,
                            message: 'list added to successfully',
                            data: insertData
                        })
                    }
                    else {
                        res.status(404).json({
                            status: 404,
                            error: 'list add unsuccessful',
                            data: insertData
                        })
                    }
                }
            }
            else {
                //if neither exist then insert into both collections
                const result = await db.collection(author).find().toArray();
                const lists  = result.find((item) => {
                    return item.lists
                })
                if (lists) {
                    const insertListsCol = await db2.collection("lists").insertOne({
                        _id: generatedId, 
                        list_name: list_name, 
                        author_details: author_details, 
                        author: author,
                        created_at: created_at,
                        list: [
                            {
                            id: movie.id, 
                            movie: movie
                            }
                        ]
                    })
                    const insert = await db.collection(author).updateOne({_id: lists._id}, {$push: {[`lists.${list_name}`]: {author_details: author_details, 
                        author: author,
                        id: movie.id, 
                        created_at: created_at, 
                        movie: movie
                    }}})
                    if (insert.modifiedCount === 1 && insertListsCol.acknowledged === true) {
                        res.status(200).json({
                            status: 200,
                            message: 'list added to successfully',
                            data: insertData
                        })
                    }
                }
                else {
                    const insertListsCol = await db2.collection("lists").insertOne({
                        _id: generatedId, 
                        list_name: list_name, 
                        author_details: author_details, 
                        author: author,
                        created_at: created_at,
                        list: [
                            {
                            id: movie.id, 
                            movie: movie
                            }
                        ]
                    })
                    const insert = await db.collection(author).insertOne(insertData)
                    if (insert.acknowledged === true && insertListsCol.acknowledged === true) {
                        res.status(200).json({
                            status: 200,
                            message: 'list added to successfully',
                            data: insertData
                        })
                    }
                    else {
                        res.status(404).json({
                            status: 404,
                            error: 'list add unsuccessful',
                            data: insertData
                        })
                    }
                }
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

module.exports = {postList};