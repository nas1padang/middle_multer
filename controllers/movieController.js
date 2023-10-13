const Movie = require('../models/movie');

class MovieController {
    static async getAll(req, res) {
        const page = parseInt(req.query.page) || 1;
        try {
            const movies = await Movie.getAllWithPagination(page);
            res.json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Something happened with the server.' });
        }
    }

    static async getById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const movie = await Movie.getById(id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found.' });
            }
            res.json(movie);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get movie.', error: error.message });
        }
    }
    
    static async create(req, res) {
        try {
            const movieData = {
                ...req.body,
                photo: req.file.filename
            };
            const newMovie = await Movie.create(movieData);
            res.status(201).json(newMovie);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create movie.', error: error.message });
        }
    }

    static async update(req, res) {
        const id = parseInt(req.params.id);
        try {
            const movieData = {
                ...req.body,
                photo: req.file.filename
            };
            const updatedMovie = await Movie.updateById(id, movieData);
            if (!updatedMovie) {
                return res.status(404).json({ message: 'Movie not found.' });
            }
            res.json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update movie.', error: error.message });
        }
    }

    static async patch(req, res) {
        const id = parseInt(req.params.id);
        try {
            const movieData = {
                ...req.body,
                photo: req.file.filename
            };
            const patchedMovie = await Movie.patchById(id, movieData);
            if (!patchedMovie) {
                return res.status(404).json({ message: 'Movie not found.' });
            }
            res.json(patchedMovie);
        } catch (error) {
            res.status(500).json({ message: 'Failed to patch movie data.', error: error.message });
        }
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            await Movie.deleteById(id);
            res.json({ message: 'Movie successfully deleted.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete movie.', error: error.message });
        }
    }

    static async showMovies(req, res) {

        console.log(req)

        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        
        try {
            const movies = await Movie.getAllWithPagination(page, limit);
            const totalMovies = await Movie.getTotalCount();
            const totalPages = Math.ceil(totalMovies / limit);
    
            res.render('movies', { movies, totalPages });
        } catch (error) {
            res.status(500).json({ message: 'Something happened with the server.' });
        }
    }
    
    
}

module.exports = MovieController;
