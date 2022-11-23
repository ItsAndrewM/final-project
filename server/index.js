const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const port = 8000;

express()

    .use(helmet())
    .use(morgan('dev'))

    .use(express.json())

    .get('/hello', (req, res) => {
        res.status(200).json({
            status: 200, 
            message: "hello world!"
        })
    })

    .listen(port, () => {
        console.log(`listening on port ${port}`)
    });