import { roles, status } from '~/constants';
export function isAuthorized(role) {
  const { FORBIDDEN } = status;
  return (req, res, next) => {
    console.log(role, "role", req.user);
    if (req.user.role !== roles.admin && req.user.role !== role) {
      res.status(FORBIDDEN);
      return res.send('Not Allowed');
    }
    next();
  };
}
