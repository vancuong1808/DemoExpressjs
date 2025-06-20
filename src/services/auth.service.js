import Account from '../models/account.model.js';
import BcryptUtil from "../common/utils/bcrypt.util.js"
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class AccountService {
        constructor() {
            this.account = Account;
            this.bcrypt = BcryptUtil;
        }

        async Register(account) {
            const { username, email, password } = account
            if (!username || !email || !password) {
                throw new Error('All fields are required')
            }
            const isExistedEmail = await this.account.findOne({ email })
            console.log(isExistedEmail)
            if (isExistedEmail) {
                throw new Error('Email already exists')
            }
            const hashedPassword = await this.bcrypt.hashPassword(password, 10)
            if (!hashedPassword) {
                throw new Error('Error hashing password')
            }
            const newUser = this.account.create({ username, email, password : hashedPassword })
            if (!newUser) {
                throw new Error('Error creating user')
            }
            return newUser
        }

        async Login(account) {
            const { email, password } = account
            if (!email || !password) {
                throw new Error('All fields are required')
            }
            const user = await this.account.findOne({ email })
            if (!user) {
                throw new Error('User not found')
            }
            const isMatch = await this.bcrypt.comparePassword(password, user.password)
            if (!isMatch) {
                    throw new Error('Invalid credentials')
            }
            const accessToken = jwt.sign({ id : user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '10m' })
            const refreshToken = jwt.sign({ id : user._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn : '1d' })

            res.cookie('refreshToken', refreshToken, {
                httpOnly : true,
                secure : process.env.NODE_ENV === 'production',
                sameSite : 'strict',
                maxAge : 24 * 60 * 60 * 1000
            })
            await user.save()

            return { accessToken, refreshToken }
        }

        async Logout(userId) {
            const user = await this.account.findById(userId)
            if (!user) {
                throw new Error('User not found')
            }
            user.refreshToken = null
            await user.save()
            return { message : 'Logout successful' }
        }

        async RefreshToken(token) {
            if (!token) {
                throw new Error('Token not found')
            }

            let decoded;
            try {
                decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            } catch (err) {
                throw new Error('Invalid token');
            }

            const user = await this.account.findById(decoded.id);
            if (!user) {
                throw new Error('User not found');
            }

            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '10m'
            });

            return { accessToken };
        }
}

export default new AccountService()
