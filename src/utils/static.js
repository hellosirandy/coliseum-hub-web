export const sports = ['Baseball', 'Football', 'Soccer', 'Hockey', 'Basketball'];

export const leagues = {
  baseball: ['MLB', 'NPB', 'CPBL', 'KBO'],
  football: ['NFL', 'NCAA'],
  soccer: ['Premier League', 'La Liga', 'Bundesliga'],
  hockey: ['NHL'],
  basketball: ['NBA'],
};

export const getLeagues = (sp) => {
  if (typeof sp !== 'object') {
    return [];
  }
  const keys = Object.keys(sp);
  const selectedSports = keys.filter((key) => {
    return sp[key] === true;
  });
  return selectedSports.map((sport) => {
    return leagues[sport.toLowerCase()];
  });
};

