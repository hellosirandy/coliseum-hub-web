import { firebaseAPIKey, googleMapsAPIKey } from '../sensitives';

export const verifyPassword = async (authData) => {
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${firebaseAPIKey}`;
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    throw new Error(e);
  }
  return res.json();
};

export const exchangeRefreshToken = async (refreshToken) => {
  let res;
  try {
    res = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${firebaseAPIKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      },
    );
  } catch (e) {
    throw new Error(e);
  }
  return res.json();
};

export const uploadImages = async (images, token) => {
  let res;
  try {
    res = await fetch(
      'https://us-central1-coliseum-hub-86341.cloudfunctions.net/uploadImages',
      {
        method: 'POST',
        body: JSON.stringify({
          images,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (e) {
    throw new Error(e);
  }
  return res.json();
};

export const geocode = async (lat, lng) => {
  let res;
  try {
    res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&language=en&latlng=${lat},${lng}&key=${googleMapsAPIKey}`);
  } catch (e) {
    throw new Error(e);
  }
  return res.json();
};

export const test = async (stadium, token) => {
  let res;
  try {
    res = await fetch(
      'https://firestore.googleapis.com/v1beta1/projects/coliseum-hub-86341/databases',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (e) {
    throw new Error(e);
  }
  return res.json();
};

