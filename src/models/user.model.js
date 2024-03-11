import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: "createdAT", updatedAt: "updatedAt" }
})

const userModel = mongoose.model('User', userSchema);

export default userModel;

