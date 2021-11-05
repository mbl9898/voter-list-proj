import { roles } from 'constants/roles';
import express from 'express';

const router = express.Router();

<<<<<<< HEAD
=======
router.get('/allUsers', isAuthorized(roles.admin), auth.getAllUsers);

router.put(
  '/',
  isAuthorized(roles.admin),
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        userId: req.body._id,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        rate: req.body.email,
        assignedBlockCodes: req.body.assignedBlockCodes,
      },
      {
        userId: 'required|string',
        username: 'required|string',
        email: 'required|string',
        role: 'required|string',
        rate: 'required|string',
        // assignedBlockCodes: 'required|array',
      },
    );
  },
  auth.updateUser,
);
router.put(
  '/updateProfile',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        username: req.body.username,
        mobileNo: req.body.mobileNo,
      },
      {
        username: 'required|string|regex:/[a-zA-Z]{2,}/',
        mobileNo: 'required|string|regex:/[0-9]{5}(?:-)[0-9]{7}/',
      },
      {
        'regex.username': `User Name.:
        Must contains two or more characters
        `,
        'regex.mobileNo': `Mobile No. should have:
        92300-1112233 Format
        `,
      },
    );
  },
  auth.updateProfile,
);

router.put(
  '/reset-password',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
      },
      {
        oldPassword:
          'required|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/',
        newPassword:
          'required|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/',
        confirmPassword: 'required|same:newPassword',
      },
    );
  },
  auth.resetPassword,
);

router.put(
  '/setDefaultBlockCode',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        userId: req.body._id,
        defaultBlockCode: req.body.defaultBlockCode,
      },
      {
        userId: 'required|string',
        defaultBlockCode: 'required|string',
      },
    );
  },
  auth.setDefaultBlockCode,
);

>>>>>>> a5f13d918e53134174a4fbd9aef5272882f704dd
module.exports = router;
