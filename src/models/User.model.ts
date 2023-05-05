import bcrypt from 'bcrypt';
import {Document, Schema, model} from 'mongoose';
import IUser from '../interfaces/models/user.interface';

interface UserMethods {
  isPasswordMatch(password: string): boolean;
}
export interface IUserModel extends IUser, UserMethods, Document {}

const UserSchema = new Schema<IUserModel>(
  {
    id: String,
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    //hide __v, password, change _id to id
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

UserSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

UserSchema.pre('save', async function (this: IUserModel, next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = model<IUserModel>('User', UserSchema);

export default User;
