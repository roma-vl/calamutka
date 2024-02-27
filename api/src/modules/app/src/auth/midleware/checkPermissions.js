import { getUserPermissions } from './permissionsService.js';
import isAuthenticated from "./isAuthenticated.js";
export default function checkPermissions(permission) {
  return async (req, res, next) => {
    try {
      await isAuthenticated(req, res, async () => {
        const userId = req.user.id;
        const userPermissions = await getUserPermissions(userId);

        if (!userPermissions.includes(permission)) {
          return res.status(403).json({message: `У вас недостатньо прав для ${permission}`});
        }
        next();
      })

    } catch (error) {
      console.error('Error checking permissions:', error);
      return res.status(500).json({ message: 'Помилка перевірки дозволів' });
    }
  };
}
