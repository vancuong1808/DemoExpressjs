import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const AuthenticationMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = decoded;
            console.log('User authenticated:', req.user);
            next();
        });
        next();
    } catch (error) {
        next(error);
    }
}
