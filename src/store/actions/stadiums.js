import { authGetToken, uiStartLoading, uiStopLoading } from './index';
import { storeImages } from './api';

export const addStadium = (stadium) => {
  return async (dispatch, getState) => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    const parsedRes = await storeImages(stadium.images, token);
    dispatch(uiStopLoading());
  };
};

