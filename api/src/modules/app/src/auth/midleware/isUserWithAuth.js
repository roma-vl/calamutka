import isAuthenticated from "./isAuthenticated.js";

export default (req, res, next) => {
  try {
    // Перевірка авторизації
    isAuthenticated(req, res, () => {

      if (req.user.role !== 'User' && req.user.role !== 'Moderator' && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Ви не авторизовані' });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
