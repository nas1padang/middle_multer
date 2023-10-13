const pool = require('../helper/connect');

class MovieRepository {
    async getById(id) {
        const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        return result.rows[0];
    }

    async getAllWithPagination(limit, offset) {
        const result = await pool.query('SELECT * FROM movies LIMIT $1 OFFSET $2', [limit, offset]);
        return result.rows;
    }

    async create(data) {
        const { title, genres, year, photo } = data;
        let getID = await pool.query('SELECT MAX(id) FROM movies');
        let id = (getID.rows[0].max) + 1;
        const result = await pool.query('INSERT INTO movies(id, title, genres, year, photo) VALUES($1, $2, $3, $4, $5)', [id, title, genres, year, photo]);
        return this.getById(id);
    }

    async updateById(id, data) {
        const { title, genres, year, photo } = data;
        await pool.query('UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5', [title, genres, year, photo, id]);
        return this.getById(id);
    }

    async patchById(id, data) {
        let temp = [];
        for (const key in data) {
            temp.push(key + ' = \'' + data[key] + '\'');
        }
        let update = temp.toString().replace(/,/g, " , ");
        const query = `UPDATE movies SET ${update} WHERE id = ${id}`;
        await pool.query(query);
        return this.getById(id);
    }

    async deleteById(id) {
        await pool.query('DELETE FROM movies WHERE id = $1', [id]);
    }

    async getTotalCount() {
        const result = await pool.query('SELECT COUNT(*) as count FROM movies');
        return result.rows[0];
    }
    

}

module.exports = new MovieRepository();
