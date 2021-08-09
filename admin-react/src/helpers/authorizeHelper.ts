import { Dispatch } from 'react';
import { setUnauthorizedData } from '../store';
import UnAuthorizedService from "../services/unAuthorizedService";

export const getUnAuthorizedList = async (dispatch: Dispatch<{ payload: any; type: string }>) => {
    try {
        dispatch(setUnauthorizedData(await UnAuthorizedService.getUnAuthorized()));
    } catch (error) {
        console.log(error);
    }
};