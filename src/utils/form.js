import {
  mapValues,
  pickBy,
} from 'lodash';
import { leagueNames, teamNames } from './index';

export const getLeagues = (selectedSports) => {
  if (typeof selectedSports !== 'object') {
    return [];
  }
  const keys = Object.keys(selectedSports);
  return keys.filter((key) => {
    return selectedSports[key] === true;
  }).map((sport) => {
    return leagueNames[sport.toLowerCase()];
  });
};

export const getTeams = (selectedLeagues) => {
  if (typeof selectedLeagues !== 'object') {
    return [];
  }
  let results = [];
  const keys = Object.keys(selectedLeagues);
  keys.filter((key) => {
    return selectedLeagues[key] === true;
  }).forEach((league) => {
    results = [...results, ...teamNames[league.toLowerCase()]];
  });
  return results;
};

export const formatStadium = (controls) => {
  const stadium = {};
  mapValues(controls, (value, key) => {
    let newValue = value.value;
    if (key === 'sports' || key === 'leagues') {
      newValue = pickBy(value.value, (v) => {
        return v === true;
      });
    } else if (key === 'open') {
      newValue = new Date(value.value).getTime();
    } else if (key === 'location') {
      newValue = {
        latitude: Number(value.value.latitude),
        longitude: Number(value.value.longitude),
      };
    } else if (key === 'tenants' || key === 'tournaments') {
      newValue = {};
      value.value.forEach((v) => {
        newValue[v] = true;
      });
    } else if (key === 'capacity') {
      newValue = Number(value.value);
    }
    stadium[key] = newValue;
  });
  return stadium;
};

