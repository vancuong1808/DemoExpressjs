import AccountService from "../services/auth.service.js";

class AccountController 
{
    constructor() {
        this.accountService = AccountService;
    }

    async Register(req, res, next) {
        try {
            const registerBody = req.body
            const registerResult = await this.accountService.Register(registerBody)
            if ( !registerResult ) {
                return res.status(400).json("Register failed")
            }
            return res.status(201).json("Register success")
        } catch(error) {
            next(error)
        }
    }
    
    async Login(req, res, next) {
        try {
            const loginBody = req.body
            const loginResult = await this.accountService.Login(loginBody)
            if ( !loginResult ) {
                return res.status(400).json("Login failed")
            }
            return res.status(200).json(loginResult)
        } catch(error) {
            next(error)
        }
    }

    async Logout(req, res, next) {
        try {
            const logoutResult = await this.accountService.Logout(req.user.id)
            if ( !logoutResult ) {
                return res.status(400).json("Logout failed")
            }
            return res.status(200).json("Logout success")
        } catch(error) {
            next(error)
        }
    }

    async Refresh(req, res, next) {
        try {
            const refreshResult = await this.accountService.RefreshToken(req.cookies.refreshToken)
            if ( !refreshResult ) {
                return res.status(400).json("Refresh failed")
            }
            return res.status(200).json(refreshResult)
        } catch(error) {
            next(error)
        }
    }

}

export default new AccountController()
