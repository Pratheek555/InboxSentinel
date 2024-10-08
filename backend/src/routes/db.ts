import mongoose, { Schema, Document, Model } from "mongoose"

mongoose.connect("mongodb+srv://pratheek:boom55@cluster0.htp4g.mongodb.net/user")

interface IUser extends Document {
    userName: string;
    email: String;
    password: string;
    refreshToken: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    refreshToken: { type: String, required: true },
})

export const user = mongoose.model('User', userSchema);


module.exports = {
    user,
}