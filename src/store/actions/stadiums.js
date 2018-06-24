import { authGetToken, uiStartLoading, uiStopLoading } from './index';
import { createStadium } from '../../apis/index';
import { loadingTypes } from '../../utils/index';

export const addStadium = (stadium) => {
  return async (dispatch) => {
    dispatch(uiStartLoading(loadingTypes.addStadium));
    const token = await dispatch(authGetToken());
    const parsedRes = await createStadium(token, stadium);
    console.log(parsedRes);
    dispatch(uiStopLoading(loadingTypes.addStadium));
  };
};

