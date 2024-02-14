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

const User = mongoose.model('User', userSchema);
module.exports = User;