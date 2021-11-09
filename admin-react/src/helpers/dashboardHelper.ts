import axios from "axios";
import { setDashboardData } from "../store";

export const getUserProgressData = async (
  dispatch: any,
  // setDashboardData: any,
  source?: any
) => {
  const dataReq = axios.create({
    baseURL:
      process.env.REACT_APP_API_IS_DEV === "true"
        ? process.env.REACT_APP_API_BASE_URL_DEV
        : process.env.REACT_APP_API_BASE_URL_STAGING,
    timeout: 15000,
    headers: {
      "x-api-key": "SG.cpdcjwepcjio",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const res = await dataReq.get("profile", { cancelToken: source.token });
  // console.log(res);
  dispatch(setDashboardData(res && res.data && res.data.data));
};
