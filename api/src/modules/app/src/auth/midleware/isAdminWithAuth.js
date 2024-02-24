import isAuthenticated from "./isAuthenticated.js";
import isModeratorWithAuth from "./isModeratorWithAuth.js";

export default (req, res, next) => {
  try {
    // Перевірка авторизації
    isAuthenticated(req, res, () => {
      // Перевірка чи користувач є модератором
      if ( req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Ви не авторизовані або не має прав для Admin' });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
