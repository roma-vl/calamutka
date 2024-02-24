import isAuthenticated from "./isAuthenticated.js";

export default (req, res, next) => {
  try {
    // Перевірка авторизації
    isAuthenticated(req, res, () => {

      if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        return res.status(403).json({ message: 'Ви не авторизовані або не має прав для Moderator' });
      } else {
        next();
      }

    });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
