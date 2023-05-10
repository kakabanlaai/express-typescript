import {ObjectSchema} from 'joi';

export default interface ValidationObj {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}
