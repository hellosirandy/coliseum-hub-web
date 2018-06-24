import { uploadImages } from './index'

export const addStadium = async (db: FirebaseFirestore.Firestore, data) => {
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
  return db.collection('stadiums').add(stadium)
}