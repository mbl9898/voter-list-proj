import React, { useEffect } from "react";
import CCard from "./CCard";
import UnAuthorizedModel from "../services/UnAuthorizedModel";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUnAuthorizedList } from "../helpers/authorizeHelper";

const Authorize = () => {
  const dispatch = useAppDispatch();
  const unauthorizedData: UnAuthorizedModel[] | [] = useAppSelector(
    (state) => state.app.unauthorizedData
  );

  useEffect(() => {
    getUnAuthorizedList(dispatch);
  }, []);
  return (
    <>
      {console.log(unauthorizedData)}
      {unauthorizedData && <CCard unauthorizedData={unauthorizedData} />}
    </>
  );
};

export default Authorize;
