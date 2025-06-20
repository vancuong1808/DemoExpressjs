import mongoose from 'mongoose';

const AccountSchema = mongoose.Schema(
{
    username: {
            type: String,
            required: true, 
    },
    password: {
            type: String,
            required: true,
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
    refreshToken: {
            type: String,
    }
},
{
    timestamps: true
});

const AccountModel = mongoose.model('Account', AccountSchema);

export default AccountModel;
