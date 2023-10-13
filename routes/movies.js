const express = require('express');
const MovieController = require('../controllers/movieController');
const authorizationChecker = require('../helper/verifyToken')
const router = express.Router();

const upload = require('../helper/upload');

router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getById)

router.post('/', authorizationChecker, upload.single('photo'), MovieController.create)
router.put('/:id', authorizationChecker, upload.single('photo'), MovieController.update)
router.patch('/:id', authorizationChecker, upload.single('photo'), MovieController.patch)
router.delete('/:id', authorizationChecker, MovieController.delete)

module.exports = router