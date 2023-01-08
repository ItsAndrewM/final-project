const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const { deleteList } = require('./handlers/deleteList');
const { deleteListItem } = require('./handlers/deleteListItem');
const { deleteUserReview } = require('./handlers/deleteUserReview');
const { getAllLists } = require('./handlers/getAllLists');
const { getAllUserReviews } = require('./handlers/getAllUserReviews');
const { getUserInfo } = require('./handlers/getUserInfo');
const { getUserLists } = require('./handlers/getUserLists');
const { getUserReview } = require('./handlers/getUserReview');
const {handleFindMovie} = require('./handlers/handleFindMovie');
const { handleFindPerson } = require('./handlers/handleFindPerson');
const { handleGetActorDetails } = require('./handlers/handleGetActorDetails');
const { handleGetActorMovieCredits } = require('./handlers/handleGetActorMovieCredits');
const { handleGetAllGenres } = require('./handlers/handleGetAllGenres');
const { handleGetAllRecommendedMovie } = require('./handlers/handleGetAllRecommendedMovies');
const { handleGetMovieById } = require('./handlers/handleGetMovieById');
const { handleGetMovieCreditsById } = require('./handlers/handleGetMovieCreditsById');
const { handleGetMovieImageById } = require('./handlers/handleGetMovieImageById');
const { handleGetMovieReviews } = require('./handlers/handleGetMovieReviews');
const { handleGetMovieByGenre } = require('./handlers/handleGetMoviesByGenre');
const { handleGetPopularMovies } = require('./handlers/handleGetPopularMovies');
const { handleGetRecommendedMovie } = require('./handlers/handleGetRecommendedMovie');
const { handleGetTopRatedMovies } = require('./handlers/handleGetTopRatedMovies');
const { handleGetUpcomingMovies } = require('./handlers/handleGetUpcomingMovies');
const { postList } = require('./handlers/postList');
const { postReview } = require('./handlers/postReview');
const { updateUserReview } = require('./handlers/updateUserReview');

const port = 8000;

express()

    .use(helmet())
    .use(morgan('dev'))

    .use(express.json())

    .use("/", express.static(__dirname + "/"))
    .use(cors({
    origin: ['https://movielabs-server.onrender.com']
    }))

    .get('/search/movies/:movie', handleFindMovie)
    .get('/search/people/:person', handleFindPerson)

    .get('/movie/:id', handleGetMovieById)
    .get('/movie/:id/images', handleGetMovieImageById)
    .get('/movie/:id/credits', handleGetMovieCreditsById)
    .get('/movie/:id/recommendations', handleGetRecommendedMovie)
    .get('/movie/:id/recommendations/all', handleGetAllRecommendedMovie)
    .get('/movie/:id/reviews', handleGetMovieReviews)
    .get('/movie/:id/userReviews', getAllUserReviews)

    .get('/actor/:id', handleGetActorDetails)
    .get('/actor/:id/movie_credits', handleGetActorMovieCredits)

    .get('/movies/genre/:genre', handleGetMovieByGenre)
    .get('/movies/genre', handleGetAllGenres)
    .get('/movies/popular', handleGetPopularMovies)
    .get('/movies/top_rated', handleGetTopRatedMovies)
    .get('/movies/upcoming', handleGetUpcomingMovies)

    .post('/movie/:id/review', postReview)
    .patch('/movie/:id/review', updateUserReview)
    .delete('/movie/:id/review', deleteUserReview)

    .post('/users/:user/lists', postList)
    .get('/users/:user/lists', getUserLists)
    .get('/users/lists', getAllLists)
    .patch('/users/:user/lists', deleteListItem)
    .delete('/users/:user/lists', deleteList)

    .get('/users/:user', getUserInfo)
    .get('/users/:user/review', getUserReview)

    .listen(port, () => {
        console.log(`listening on port ${port}`)
    });