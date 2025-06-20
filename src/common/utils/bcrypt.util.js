import bcrypt from 'bcryptjs'

class BcryptUtil {
    static async hashPassword(password, saltRounds) {
        return await bcrypt.hash(password, saltRounds);
    }
    static async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

export default BcryptUtil
