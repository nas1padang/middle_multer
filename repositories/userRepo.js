const pool = require('../helper/connect')

class UserRepository {
    async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
}

module.exports = new UserRepository();