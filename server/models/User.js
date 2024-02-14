import { model, models } from 'mongoose';
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    role: String,
},
{
  timestamps: true,
});

const User = models.User || model('User', userSchema);
export default User