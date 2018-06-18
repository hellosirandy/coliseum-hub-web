import { authGetToken, uiStartLoading, uiStopLoading } from './index';
import { uploadImages } from './api';

export const addStadium = (stadium) => {
  return async (dispatch) => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    const parsedRes = await uploadImages(stadium.images, token);
    dispatch(uiStopLoading());
  };
};

