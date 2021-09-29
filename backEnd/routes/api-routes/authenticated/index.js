import testRoutes from './test.route';
import profileRoutes from './profile.route';
import unAuthorizedRoutes from './unAuthorized.route';
import authorizedRoutes from './authorized.route';
import authRoutes from './auth.route';
import blockCodeRoutes from './blockCode.route';
import votesDataRoutes from './votesData.route';
import logoutRoutes from './logout.route';
import taskRoutes from './task.route';
import paymentRoutes from './payment.route';

//Private endpoints registered in List
//List is iteratively registered in main index file
//This file has private/authenticated routes only
const authenticatedRoutes = [
  {
    path: '/authTest',
    route: testRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
  {
    path: '/unAuthorized',
    route: unAuthorizedRoutes,
  },
  {
    path: '/authorized',
    route: authorizedRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/logout',
    route: logoutRoutes,
  },
  {
    path: '/votesData',
    route: votesDataRoutes,
  },
  {
    path: '/blockCode',
    route: blockCodeRoutes,
  },
  {
    path: '/task',
    route: taskRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

module.exports = authenticatedRoutes;
