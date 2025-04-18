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

export default {
    GetAll,
    GetById
}