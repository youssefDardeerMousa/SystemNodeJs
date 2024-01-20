import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    repassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model("Users", userSchema);  // Provide a name for the model

