import { leagues, teams } from './index';

export const getLeagues = (selectedSports) => {
  if (typeof selectedSports !== 'object') {
    return [];
  }
  const keys = Object.keys(selectedSports);
  return keys.filter((key) => {
    return selectedSports[key] === true;
  }).map((sport) => {
    return leagues[sport.toLowerCase()];
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
    results = [...results, ...teams[league.toLowerCase()]];
  });
  return results;
};
