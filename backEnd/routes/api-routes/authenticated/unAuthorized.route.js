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
    console.log(req.body);
    const {
      blockCode,
      constituencyName,
      moza,
      dehya,
      city,
      patwarHalka,
      tapaydar,
      tehseel,
      talka,
      district,
      unionCouncil,
      bookNo,
      constituency,
      gender,
      voteSNo,
      familyNo,
      name,
      maritalStatus,
      fatherHusbandName,
      cnic,
      age,
      houseNo,
      street,
      phase,
      sector,
      lane,
      boulevardAvenue,
      otherArea,
      address,
    } = req.body;
    validation(
      req,
      res,
      next,
      {
        blockCode,
        constituencyName,
        moza,
        dehya,
        city,
        patwarHalka,
        tapaydar,
        tehseel,
        talka,
        district,
        unionCouncil,
        bookNo,
        constituency,
        gender,
        voteSNo,
        familyNo,
        name,
        maritalStatus,
        fatherHusbandName,
        cnic,
        age,
        houseNo,
        street,
        phase,
        sector,
        lane,
        boulevardAvenue,
        otherArea,
        address,
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
        cnic: 'required|string',
        age: 'required|integer',
        houseNo: 'required|string',
        street: 'required|string',
        phase: 'required|string',
        sector: 'required|string',
        lane: 'required|string',
        boulevardAvenue: 'required|string',
        otherArea: 'required|string',
        address: 'string',
        status: 'string',
      },
    );
  },
  isAuthorized(roles.dataEntry),
  unAuthorized.uploadData,
);

router.put(
  '/rejectVote/',
  (req, res, next) => {
    console.log(req.body);
    validation(
      req,
      res,
      next,
      {
        id: req.body.id,
      },
      {
        id: 'required|string',
      },
    );
  },
  isAuthorized(roles.admin),
  unAuthorized.rejectVote,
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
