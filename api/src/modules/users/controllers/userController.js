import { User } from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.getUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createUser = async (req, res) => {
    // Логіка для створення нового користувача
};

export const getUserById = async (req, res) => {
    // Логіка для отримання користувача за ID
};

export const updateUserById = async (req, res) => {
    // Логіка для оновлення користувача за ID
};

export const deleteUserById = async (req, res) => {
    // Логіка для видалення користувача за ID
};
