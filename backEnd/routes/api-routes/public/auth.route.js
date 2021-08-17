import express from 'express';
import { auth } from '~/controllers';
import { validate as validation } from '~/middlewares';

const router = express.Router();

router.post(
  '/register',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      },
      {
        username: 'required|string',
        email: 'required|string|email',
        password:
          'required|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/',
        confirmPassword: 'required|same:password',
      },
      {
        'regex.password': `Password should have:
        At least one upper case 
        At least one lower case
        At least one digit
        At least one special character`,
      },
    );
  },
  auth.registerUser,
);

router.post(
  '/login',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        email: req.body.email,
        password: req.body.password,
      },
      {
        email: 'required|string|email',
        password: 'required|string',
      },
    );
  },
  auth.loginUser,
);

router.put(
  '/refresh-session',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        refresh_token: req.headers.refresh_token,
      },
      {
        refresh_token: 'required|string',
      },
    );
  },
  auth.refreshSession,
);

router.patch(
  '/forgot-password',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        email: req.headers.email,
      },
      {
        email: 'required|string|email',
      },
    );
  },
  auth.sendCodePasswordRecovery,
);

router.patch(
  '/reset-password',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        otp: req.body.otp,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
      },
      {
        otp: 'required|string',
        password:
          'required|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/',
        confirm_password: 'required|same:password',
      },
    );
  },
  auth.resetPassword,
);

router.get(
  '/validateToken',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        token: req.headers.authorization,
      },
      {
        token: 'required|string',
      },
    );
  },
  auth.validatorToken,
);

// router.put(
//   '/updateRole',
//   (req, res, next) => {
//     validation(
//       req,
//       res,
//       next,
//       {
//         role: req.body.role,
//       },
//       {
//         role: 'required|string',
//       },
//     );
//   },
//   auth.userRole,
// );

module.exports = router;
