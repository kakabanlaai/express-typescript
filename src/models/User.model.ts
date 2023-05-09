import bcrypt from 'bcrypt';
import {Document, Model, Schema, model} from 'mongoose';
import IUser from '../interfaces/models/user.interface';

export interface UserDocument extends IUser, Document {
  isPasswordMatch(password: string): boolean;
}

const UserSchema = new Schema<UserDocument>(
  {
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

UserSchema.pre<UserDocument>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema);
export default UserModel;
