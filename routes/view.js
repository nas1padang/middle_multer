const express = require('express');
const MovieController = require('../controllers/movieController');
const router = express.Router();

router.get('/', MovieController.showMovies);

module.exports = router