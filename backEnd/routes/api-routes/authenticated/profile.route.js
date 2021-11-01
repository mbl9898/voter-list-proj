import { roles } from 'constants/roles';
import express from 'express';
import { isAuthorized } from 'middlewares/roles';
import { profile } from '~/controllers';
import { validate as validation } from '~/middlewares';

const router = express.Router();

router.get('/', profile.userData);

router.get('/allUsers', isAuthorized(roles.admin), profile.getAllUsers);

router.get(
  '/userData/:email',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        email: req.params.email,
      },
      {
        email: 'required|string',
      },
    );
  },
  isAuthorized(roles.admin),
  profile.getUserDataByEmail,
);
router.put(
  '/dataAccess',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        userId: req.body.userId,
        district: req.body.district,
        city: req.body.city,
        tehseel: req.body.tehseel,
        constituency: req.body.constituency,
        unionCouncil: req.body.unionCouncil,
        constituencyName: req.body.constituencyName,
        blockCode: req.body.blockCode,
        phase: req.body.phase,
        sector: req.body.sector,
        street: req.body.street,
        gender: req.body.gender,
        lane: req.body.lane,
        boulevardAvenue: req.body.boulevardAvenue,
      },
      {
        userId: 'required|string',
        fullAccess: 'boolean',
        district: 'string',
        city: 'string',
        tehseel: 'string',
        constituency: 'string',
        unionCouncil: 'string',
        constituencyName: 'string',
        blockCode: 'number',
        phase: 'string',
        sector: 'string',
        street: 'string',
        gender: 'string',
        lane: 'string',
        boulevardAvenue: 'string',
      },
    );
  },
  isAuthorized(roles.admin),
  profile.updatedUserDataAccess,
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
  profile.setDefaultBlockCode,
);

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
  profile.updateUser,
);

//Patch route to password change
//Validation middleware will validate old_password,new_password,confirm_password field before proceeding further
router.patch(
  '/change-password',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        old_password: req.body.old_password,
        new_password: req.body.new_password,
        confirm_password: req.body.confirm_password,
      },
      {
        old_password: 'required|string',
        new_password:
          'required|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/',
        confirm_password: 'required|same:new_password',
      },
    );
  },
  profile.changePassword,
);

module.exports = router;
