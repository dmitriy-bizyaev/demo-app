import mongoose from 'mongoose';

interface User extends mongoose.Document {
    name: string,
    email: string,
}

const schema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
});

export default mongoose.model<User>('User', schema);
