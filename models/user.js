const UserRepository = require('../repositories/userRepo');

class User{
    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.gender = data.gender;
        this.password = data.password;
        this.role = data.role;
    }

    static async findByEmail(email) {
        const userData = await UserRepository.findByEmail(email);
        if (!userData) return null;
        return new User(userData);
    }

    validatePassword(password) {
        return password === this.password;
    }

}

module.exports = User