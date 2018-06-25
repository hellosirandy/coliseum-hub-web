import { firestore as db } from 'firebase-admin';
import { uploadImages } from './index';
import * as request from 'request-promise';

export const addStadium = async (data) => {
  if (!data) {
    throw { error: "Missing stadium field" };
  }
  let images = [];
  if (data.images && data.images.length > 0) {
    try {
      images = await uploadImages(data.images);
    } catch(e) {
      console.log('Failed to upload images');
      images = [];
    }
  }
  const stadium = {
    ...data,
    images,
  }
  return db().collection('stadiums').add(stadium);
}

export const getStadiums = async () => {
  return db().collection('stadiums').get();
}

export const downloadImage = async (url) => {
  // let response;
  try {
    const options = {
      url,
      encoding: 'base64'
    };
    const base64 = await request.get(options);
    return uploadImages([{base64, name: 'temp.jpg'}]);
  } catch(e) {
    console.log(e);
    throw e;
  }
}