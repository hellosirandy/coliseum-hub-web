import { uiStartLoading, uiStopLoading } from './index';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, AUTH_FAILED, AUTH_CHANGE_STATUS } from './actionTypes';
import { verifyPassword, exchangeRefreshToken } from '../../apis/index';
import { loadingTypes } from '../../utils/index';

export const tryAuth = (authData) => {
  return async (dispatch) => {
    dispatch(uiStartLoading(loadingTypes.login));
    let parsedRes;
    try {
      parsedRes = await verifyPassword(authData);
    } catch (e) {
      console.log(e);
      alert('Authentication failed, please try again!');
      dispatch(uiStopLoading(loadingTypes.login));
      return;
    }
    dispatch(uiStopLoading(loadingTypes.login));
    if (parsedRes.error) {
      console.log(parsedRes);
      dispatch(authFailed(parsedRes.error.message));
    } else {
      dispatch(authChangeStatus('IN'));
      dispatch(authStoreToken(
        parsedRes.idToken,
        parsedRes.expiresIn,
        parsedRes.refreshToken,
      ));
    }
  };
};

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token,
    expiryDate,
  };
};

export const authChangeStatus = (authStatus) => {
  return {
    type: AUTH_CHANGE_STATUS,
    authStatus,
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return (dispatch) => {
    const now = new Date();
    const expiryDate = now.getTime() + (expiresIn * 1000);
    dispatch(authSetToken(token, expiryDate));
    localStorage.setItem('ch:auth:token', token);
    localStorage.setItem('ch:auth:expiryDate', expiryDate.toString());
    localStorage.setItem('ch:auth:refreshToken', refreshToken);
  };
};

export const authFailed = (errorMessage) => {
  return {
    type: AUTH_FAILED,
    errorMessage,
  };
};

export const authLogout = () => {
  return (dispatch) => {
    dispatch(authClearStorage());
    dispatch(authChangeStatus('OUT'));
    dispatch(authRemoveToken());
  };
};
export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN,
  };
};

export const authClearStorage = () => {
  return () => {
    localStorage.removeItem('ch:auth:token');
    localStorage.removeItem('ch:auth:expiryDate');
    return localStorage.removeItem('ch:auth:refreshToken');
  };
};

export const authAutoSignIn = () => {
  return async (dispatch) => {
    try {
      await dispatch(authGetToken());
      dispatch(authChangeStatus('IN'));
    } catch (e) {
      console.log('Failed to fetch token!');
      dispatch(authChangeStatus('OUT'));
    }
  };
};
export const isTokenValid = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const { expiryDate } = getState().auth;
    if (!token || new Date(expiryDate) <= new Date()) {
      const tokenFromStorage = localStorage.getItem('ch:auth:token');
      if (!tokenFromStorage) {
        throw new Error();
      }
      const expiryDateFromStorage = localStorage.getItem('ch:auth:expiryDate');
      const parsedExpiryDate = new Date(parseInt(expiryDateFromStorage, 10));
      const now = new Date();
      if (parsedExpiryDate > now) {
        dispatch(authSetToken(tokenFromStorage));
        return tokenFromStorage;
      }
      throw new Error();
    } else {
      return token;
    }
  };
};

export const authGetToken = () => {
  return async (dispatch) => {
    let token;
    try {
      token = await dispatch(isTokenValid());
    } catch (e) {
      const refreshToken = localStorage.getItem('ch:auth:refreshToken');
      const parsedRes = await exchangeRefreshToken(refreshToken);
      if (parsedRes.id_token) {
        dispatch(authStoreToken(
          parsedRes.id_token,
          parsedRes.expires_in,
          parsedRes.refresh_token,
        ));
        return parsedRes.id_token;
      }
      dispatch(authClearStorage());
      throw new Error();
    }
    if (!token) {
      throw new Error();
    }
    return token;
  };
};
