import axios from "axios";

export const getUserProgressData = async (
  dispatch: any,
  setDashboardData: any,
  source?: any
) => {
  const dataReq = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 5000,
    headers: {
      "x-api-key": "SG.cpdcjwepcjio",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const res = await dataReq.get("profile-settings", { cancelToken: source });
  console.log(res, "dashboardService.getUserData Res");
  dispatch(setDashboardData(res && res.data && res.data.data));
};
