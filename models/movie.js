const MovieRepository = require('../repositories/movieRepo');

class Movie{
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.genres = data.genres;
        this.year = data.year;
        this.photo = data.photo;
    }

    static async getById(id){
        const result = await MovieRepository.getById(id);
        if (!result) return null;
        return new Movie(result);
    }

    static async getAllWithPagination(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const moviesData = await MovieRepository.getAllWithPagination(limit, offset);
        return moviesData.map(movie => new Movie(movie));
    }

    static async create(data) {
        const movieData = await MovieRepository.create(data);
        return new Movie(movieData);
    }

    static async updateById(id, data) {
        const movieData = await MovieRepository.updateById(id, data);
        if (!movieData) return null;
        return new Movie(movieData);
    }

    static async patchById(id, data) {
        const movieData = await MovieRepository.patchById(id, data);
        if (!movieData) return null;
        return new Movie(movieData);
    }

    static async deleteById(id) {
        await MovieRepository.deleteById(id);
    }

    static async getTotalCount() {
        const result = await MovieRepository.getTotalCount();
        return result.count;
    }

}

module.exports = Movie;