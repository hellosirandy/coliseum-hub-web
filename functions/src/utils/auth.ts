import {auth} from 'firebase-admin';

export const checkAuthorization = async (req) => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    throw { error: 'Missing authorization field'};
  }
  if (!authorization.includes('Bearer ')) {
    throw { error: 'Invalid Bearer format'};
  }
  const tokenId = req.get('Authorization').split('Bearer ')[1];
  return auth().verifyIdToken(tokenId);
};

