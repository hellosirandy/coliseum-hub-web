import * as cors from 'cors';
import * as utils from '../utils/index';

export const createStadium = (req, res) => {
  cors({ origin: true })(req, res, async () => {
    switch (req.method) {
      case 'POST': 
        let user;
        try {
          user = await utils.checkAuthorization(req);
        } catch (e) {
          return res.status(401).send(e);
        }
        let result;
        try {
          result = await utils.addStadium(req.body.stadium, user.uid);
        } catch (e) {
          return res.status(406).send(e);
        }
        res.status(201).send(user);
      default:
        res.status(405).send();
    }
  })
}

export const getStadiums = (req, res) => {
  cors({origin: true})(req, res, async () => {
    switch(req.method) {
      case 'GET':
        let snapshot;
        try {
          snapshot = await utils.getStadiums();
        } catch (e) {
          return res.status(401).send(e);
        }
        const stadiums = []; 
        snapshot.forEach(doc => {
          stadiums.push(doc.data());
        });
        res.status(200).send(stadiums);
      default:
        res.status(405).send();
    }
  })
}