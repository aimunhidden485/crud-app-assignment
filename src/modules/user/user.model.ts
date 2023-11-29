import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import TUser from './user.interface';
const { Schema } = mongoose;

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  fullName: {
    firstName: { type: String, required: true, max: 10 },
    lastName: { type: String, required: true, max: 10 },
  },
  age: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
});

//middlewares
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

const User = mongoose.model<TUser>('User', userSchema);
export default User;
