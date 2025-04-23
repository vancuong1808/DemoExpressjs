import userService from "../services/user.service.js"

const GetAll = async( req, res, next ) => {
    try {
        const users = await userService.GetAll()
        return res.render('home', { users : users })
    } catch (error) {
        next( error )
    }
}

const GetById = async( req, res, next ) => {
    try {
        const id = parseInt( req.params.id )
        const user = await userService.GetById( id )
        return res.status(200).json({
            data : user
        })
    } catch (error) {
        next( error )
    }
}

const Create = async (req, res, next) => {
    try {
        const body = req.body
        const newUser = await userService.Create( body )
        if ( !newUser ) {
            return res.status(400).json("Bad Request")
        }
        return res.status(201).json("Created")
    } catch (error) {
        next( error )
    }
}

const Update = async (req, res, next) => {
    try {
        const id = parseInt( req.params.id )
        const body = req.body
        const updatedUser = await userService.Update( id, body )
        if ( !updatedUser ) {
            return res.status(404).json("Not Found")
        }
        return res.status(200).json("Success")
    } catch (error) {
        next( error )
    }
}

const Delete = async (req, res, next) => {
    try {
        const id = parseInt( req.params.id )
        const deletedUser = await userService.Delete( id )
        if ( !deletedUser ) {
            return res.status(404).json("Not Found")
        }
        return res.status(200).json("Success")
    } catch (error) {
        next( error )
    }
}

export default {
    GetAll,
    GetById,
    Create,
    Update,
    Delete
}