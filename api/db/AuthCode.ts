import { Schema, model } from 'mongoose';

const millisecondsInSecond = 1000;
const secondsInMinutes = 60;
const millisecondsInMinutes = millisecondsInSecond * secondsInMinutes;

const authCodeSchema = new Schema({
  email: {
    type: String,
    required: true,
    maxLength: 40,
    minLength: 1,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    required: true,
    // Defaults to expiring in ten minutes
    default: new Date(new Date().getTime() + 10 * millisecondsInMinutes),
  },
});

const AuthCode = model('auth-code', authCodeSchema);

export default AuthCode;
