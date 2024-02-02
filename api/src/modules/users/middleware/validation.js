const validateUserData = (req, res, next) => {
    const { email, password } = req.body;
    // console.log('valllll')

    // if (username && username.length < 4 ) {
    //     return res.status(400).json({ message: 'Імя має бути довший 6 символів' });
    // }
    // if (!email || !password) {
    //     return res.status(400).json({ message: 'Missing required fields' });
    // }

    next();
};

export { validateUserData };
