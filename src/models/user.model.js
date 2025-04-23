import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 0,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

const UserModel = mongoose.model("UserCollection", UserSchema)
export default UserModel