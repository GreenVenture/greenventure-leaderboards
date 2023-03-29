/* This is the leaderboards router. It handles the updating and retrieving of leaderboards. */
const Leaderboard = require('../models/leaderboard')
const leaderboardsRouter = require('express').Router()

/* This is a GET request to the users endpoint. It is retrieving the users from the
database. */
leaderboardsRouter.get('/', async (request, response) => {
    const users = await Leaderboard
        .find({})
    if (users) {
        response.json(users)
    } else {
        response.status(404).end()
    }
});

/* This is a GET request to the users endpoint. It is retrieving the users from the
database. */
leaderboardsRouter.get('/:id', async (request, response) => {
    const user = await Leaderboard.findById(request.params.id);
    if (user) {
        response.json(user);
    } else {
        response.status(404).end();
    }
});

/* This is a POST request to the users endpoint. It is creating a new user in the database. */
leaderboardsRouter.post('/', async (request, response, next) => {
    const { body } = request
  
    // Check if a document with the same name already exists
    const existingUser = await Leaderboard.findOne({ name: body.name })
    if (existingUser) {
        return response.status(400).json({ error: 'Name must be unique' })
    }
  
    // Create a new leaderboard object and save it to the collection
    const user = new Leaderboard({
        name: body.name,
        points: body.points,
    })
  
    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
  });
  

/* This is a PATCH request to the users endpoint. It is updating a user in the database. */
leaderboardsRouter.patch('/:name', async (request, response, next) => {
    const { body } = request;
  
    try {
        const updatedUser = await Leaderboard.findOneAndUpdate({ name: request.params.name }, body, { new: true });
        response.status(204).json(updatedUser);
    } catch (exception) {
        next(exception);
    }
});

module.exports = leaderboardsRouter