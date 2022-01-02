import { ApiService } from '../services/ApiServices';
import { setDashboardData } from '../store';

export const getUserProgressData = async (dispatch: any, source?: any) => {
  const res = await ApiService.get('profile', { cancelToken: source.token });
  console.log(res);
  dispatch(setDashboardData(res?.data));
};
