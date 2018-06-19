import { geocode } from '../apis/api';

export const getCity = async (lat, lng) => {
  const parsedRes = await geocode(lat, lng);
  return parsedRes.results[0].formatted_address;
};

