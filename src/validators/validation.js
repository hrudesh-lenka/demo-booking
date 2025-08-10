// src/validators/validation.js

export const validation = {};

validation.validateBuffet = (value) => {
  return value !== "";
};

validation.validateEmail = (value) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(value);
};

validation.validatePlatecount = (value) => {
  return value !== "" && value > 0;
};

validation.validateDate = (value) => {
  let formdate = new Date(value);
  let todayDate = new Date();
  return formdate > todayDate; // booking date must be after today
};
