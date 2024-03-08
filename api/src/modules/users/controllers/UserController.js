
import UserRepository from "../repositories/UserRepository.js";

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserRepository.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserRepository.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await UserRepository.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateUserById(req, res) {
        try {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = await UserRepository.updateUserById(id, userData);
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteUserById(req, res) {
        try {
            const { id } = req.params;
            await UserRepository.deleteUserById(id);
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async findUserByUserName(req, res) {
        try {
            const { username } = req.query;
            const user = await UserRepository.findUserByUserName(username);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async findUserByEmail(req, res) {
        try {
            const { email } = req.params;
            const user = await UserRepository.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default UserController;
