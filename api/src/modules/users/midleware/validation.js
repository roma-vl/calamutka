// validation.js
const validateUserData = (req, res, next) => {
    const { username, password } = req.body;
    console.log('444444444444444444')

    if (username && username.length < 4 ) {
        return res.status(400).json({ message: 'Імя має бути довший 6 символів' });
    }
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    next();
};

module.exports = { validateUserData };
