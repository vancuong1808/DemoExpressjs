import express from 'express'
import AuthController from '../../controllers/auth.controller.js'
const router = express.Router()

router.route('/register').post(AuthController.Register.bind(AuthController))
router.route('/login').post(AuthController.Login.bind(AuthController))
router.route('/refresh').post(AuthController.Refresh.bind(AuthController))
router.route('/logout').post(AuthController.Logout.bind(AuthController))

export default router
