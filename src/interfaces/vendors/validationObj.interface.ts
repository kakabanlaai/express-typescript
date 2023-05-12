import {ObjectSchema} from 'joi';

export default interface ValidationObj<T = any> {
  body?: ObjectSchema<T>;
  params?: ObjectSchema<T>;
  query?: ObjectSchema<T>;
}
