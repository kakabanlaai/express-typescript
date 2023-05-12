import {Types} from 'mongoose';

export const objectId = (value: any, helpers: any) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }

  return value;
};

export const password = (value: any, helpers: any) => {
  if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
    return helpers.message(
      'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one digit'
    );
  }
  return value;
};
