const User = require('../models/user');
const { createToken } = require('../helper/auth')

class UserController {
    static async login(req, res) {
        try {
            const user = await User.findByEmail(req.body.email);
            if (!user) {
                return res.status(400).json({message: "Invalid email or password"});
            }

            const validPassword = await user.validatePassword(req.body.password);
            if (!validPassword) {
                return res.status(400).json({message: "Invalid email or password"});
            }

            const token = createToken({userId: user.id, role: user.role});
            res.json({message: "Logged in successfully!", token: token});

        }catch(err) {
            res.status(500).json({message: "Login failed!", error: err.message});
        }
    }
}

module.exports = UserController;
