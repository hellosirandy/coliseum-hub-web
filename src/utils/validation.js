import { forOwn, isNumber } from 'lodash';

export const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(val);
        break;
      case 'location':
        isValid = isValid && locationValidator(val);
        break;
      case 'objectNotEmpty':
        isValid = isValid && objectNotEmptyValidator(val);
        break;
      default:
        isValid = true;
    }
  }

  return isValid;
};

const emailValidator = (val) => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
  return val === checkValue;
};

const notEmptyValidator = (val) => {
  return val.trim() !== '';
};

const objectNotEmptyValidator = (val) => {
  const keys = Object.keys(val);
  return keys.filter((key) => {
    return val[key] === true;
  }).length > 0;
};

const locationValidator = (val) => {
  return isNumber(Number(val.lagitude)) && isNumber(Number(val.longitude));
};

export const validateForm = (controls) => {
  let success = true;
  forOwn(controls, (value) => {
    if (!value.valid) {
      success = false;
      console.log(value);
      return undefined;
    }
  });
  return success;
};

