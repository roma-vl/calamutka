import jwt from "jsonwebtoken";
import {log} from "util";
import knex from '../../connection/app.js'

export default async (req, res, next) => {
    try {

        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            new Error('Invalid or missing Authorization header');
        }

        const token = authorizationHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'your_secret_key');
        const userId = decodedToken.sub;
        const [user] = await knex.select('*').from('users').where('id', userId);

        if (!user || user.length === 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized dd' });
    }
};
