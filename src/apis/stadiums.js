import { googleMapsAPIKey, cloudFunctionsURL } from '../sensitives';

export const geocode = async (lat, lng) => {
  let res;
  try {
    res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&language=en&latlng=${lat},${lng}&key=${googleMapsAPIKey}`);
  } catch (e) {
    throw new Error(e);
  }
  return res.json();
};

export const createStadium = async (token, stadium) => {
  let res;
  try {
    res = await fetch(
      `${cloudFunctionsURL}/createStadium/`,
      {
        method: 'POST',
        body: JSON.stringify({
          stadium,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (e) {
    throw new Error(e);
  }
  return res.json();
};

