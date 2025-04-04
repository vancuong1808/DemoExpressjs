import express from 'express'
import userController from '../../controllers/user.controller.js'
import { ValidateUserId } from '../../middlewares/user.validate.js'
const router = express.Router()

router.route('/')
    .get( userController.GetAll )
    .post( async (req, res) => {
        try {
            const db = await DbHelper.readDb()
            const body = req.body
            db.User.push( body )
            await DbHelper.writeDb( db )
            return res.status(201).json("Created")
        } catch (error) {
            return res.status(500).json("error : ", error )
        }
    })

router.route('/:id')
    .get( ValidateUserId, userController.GetById )
    .put( async (req, res) => {
        try {
            const db = await DbHelper.readDb()
            const id = parseInt( req.params.id )
            const body = req.body
            const index = db.User.findIndex( (user) => user.id === id )
            if ( index !== -1 ) {
                db.User[index] = { ...db.User[index], ...body }
                await DbHelper.writeDb( db )
                return res.status(200).json("Success")
            } else {
                return res.status(404).json("Not Found")
            }
        } catch (error) {
            return res.status(500).json("error : ", error )
        }
    })
    .delete( async (req, res) => {
        try {
            const db = await DbHelper.readDb()
            const id = parseInt( req.params.id )
            const index = db.User.findIndex( (user) => user.id === id )
            if ( index !== -1 ) {
                db.User.splice(index, 1)
                await DbHelper.writeDb( db )
                return res.status(200).json("Success")
            } else {
                return res.status(404).json("Not Found")
            }
        } catch (error) {
            return res.status(500).json("error : ", error )
        }
    })


export default router