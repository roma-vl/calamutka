const getAllUsers = (knex) => async (req, res) => {
    try {
        const users = await knex.select('*').from('users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { getAllUsers };
