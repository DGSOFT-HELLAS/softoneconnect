import { model, models } from 'mongoose';
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    usercode: Number,
    code: String,
    name: String,
    email: String,
    password: String,
    role: String,
    CCCDGHUB: Number,
},
{
  timestamps: true,
});

const User = models.User || model('User', userSchema);
export default User