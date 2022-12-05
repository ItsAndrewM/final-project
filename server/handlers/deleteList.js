"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//function handles deleting an entire list from both the individual users database and the lists collection
const deleteList = async (req, res) => {
    const {list_name, author} = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    try {
        //connect to the users and lists DB
        const db = client.db('users');
        const db2 = client.db('lists');
        //check if the correct body exists, since just the author and list name are needed
        if (author && list_name) {
            //find the correct list, check if it exists
            const foundResult = await db.collection(author).findOne({lists: { $exists: [list_name]}})
            const listsResult = await db2.collection("lists").findOne({list_name: list_name, author: author})
            //if they exists, grab the id to use in the query
            if (foundResult && listsResult) {
                const _id = foundResult._id
                //since the list name is nested inside the users collection, it needs to be updated and unset instead of deleting
                const deleteList = await db.collection(author).updateOne({_id: _id}, {$unset: {[`lists.${list_name}`]: []}});
                //lists collection can be deleted by using the list name and author name from earlier
                const deleteUserList = await db2.collection("lists").deleteOne({list_name: list_name, author: author});
                //if successful, send 200 response
                if (deleteList.modifiedCount !== 0 && deleteUserList.deletedCount !== 0) {
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

module.exports = {deleteList};