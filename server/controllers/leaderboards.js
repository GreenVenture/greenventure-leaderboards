/* This is the leaderboards router. It handles the updating and retrieving of leaderboards. */
const leaderboardsRouter = require('express').Router()
const Leaderboard = require('../models/leaderboard')

leaderboardsRouter.get('/', async (request, response) => {
    const leaderboards = await Leaderboard.find({})
    response.json(leaderboards.map(leaderboard => leaderboard.toJSON()))
}