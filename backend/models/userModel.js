import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    dob: {type: String, required: true},
    gender: {type: String, required: true},
    batch: {type: String, required: true},
    // image: {type: Array},
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;