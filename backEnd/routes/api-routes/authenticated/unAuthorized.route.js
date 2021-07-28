import express from 'express';
import { isAuthorized } from 'middlewares/roles';
import { unAuthorized } from '~/controllers';
import { validate as validation } from '~/middlewares';
import { roles } from '~/constants';

const router = express.Router();

router.get('/', isAuthorized(roles.admin), unAuthorized.getData);

router.get(
  '/:id',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        id: req.params.id,
      },
      {
        id: 'required|string',
      },
    );
  },
  isAuthorized(roles.admin),
  unAuthorized.getDataById,
);

router.post(
  '/',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        blockCode: req.body.blockCode,
        constituencyName: req.body.constituencyName,
        moza: req.body.moza,
        dehya: req.body.dehya,
        city: req.body.city,
        patwarHalka: req.body.patwarHalka,
        tapaydar: req.body.tapaydar,
        tehseel: req.body.tehseel,
        talka: req.body.talka,
        district: req.body.district,
        unionCouncil: req.body.unionCouncil,
        bookNo: req.body.bookNo,
        constituency: req.body.constituency,
        gender: req.body.gender,
        voteSNo: req.body.voteSNo,
        familyNo: req.body.familyNo,
        name: req.body.name,
        maritalStatus: req.body.maritalStatus,
        fatherHusbandName: req.body.fatherHusbandName,
        nic: req.body.nic,
        age: req.body.age,
        houseNo: req.body.houseNo,
        street: req.body.street,
        phase: req.body.phase,
        sector: req.body.sector,
        lane: req.body.lane,
        boulevardAvenue: req.body.boulevardAvenue,
        otherArea: req.body.otherArea,
        address: req.body.address,
      },
      {
        blockCode: 'required|integer',
        constituencyName: 'required|string',
        moza: 'required|string',
        dehya: 'required|string',
        city: 'required|string',
        patwarHalka: 'required|string',
        tapaydar: 'required|string',
        tehseel: 'required|string',
        talka: 'required|string',
        district: 'required|string',
        unionCouncil: 'required|string',
        bookNo: 'required|string',
        constituency: 'required|string',
        gender: 'required|string',
        voteSNo: 'required|integer',
        familyNo: 'required|integer',
        name: 'required|string',
        maritalStatus: 'required|string',
        fatherHusbandName: 'required|string',
        nic: 'required|integer',
        age: 'required|integer',
        houseNo: 'required|string',
        street: 'required|string',
        phase: 'required|string',
        sector: 'required|string',
        lane: 'required|string',
        boulevardAvenue: 'required|string',
        otherArea: 'required|string',
        address: 'required|string',
      },
    );
  },
  isAuthorized(roles.dataEntry),
  unAuthorized.uploadData,
);

router.delete(
  '/:id',
  (req, res, next) => {
    validation(
      req,
      res,
      next,
      {
        id: req.params.id,
      },
      {
        id: 'required|string',
      },
    );
  },
  isAuthorized(roles.admin),
  unAuthorized.deleteRecord,
);

module.exports = router;
