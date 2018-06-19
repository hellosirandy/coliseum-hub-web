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
    throw new Error();
  }
  return res.json();
};

export const exchangeRefreshToken = async (refreshToken) => {
  const res = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${firebaseAPIKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    },
  );
  return res.json();
};

export const uploadImages = async (images, token) => {
  const res = await fetch(
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
  return res.json();
};

export const geocode = async (lat, lng) => {
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&language=en&latlng=${lat},${lng}&key=${googleMapsAPIKey}`);
  return res.json();
};
