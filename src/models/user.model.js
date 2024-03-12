import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

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

userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const userModel = mongoose.model('User', userSchema);

export default userModel;

