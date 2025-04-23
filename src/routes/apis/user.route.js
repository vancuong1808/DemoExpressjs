import express from 'express'
import UserController from '../../controllers/user.controller.js'
import { ValidateUserId } from '../../middlewares/user.validate.js'
const router = express.Router()

router.route('/')
    .get( UserController.GetAll )
    .post( UserController.Create )

router.route('/:id')
    .get( ValidateUserId, UserController.GetById )
    .put( ValidateUserId, UserController.Update )
    .delete( ValidateUserId, UserController.Delete )


export default router