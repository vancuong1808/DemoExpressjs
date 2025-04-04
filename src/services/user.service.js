import DbHelper from '../helpers/DbHelper.js'

const GetAll = async() => {
    const db = await DbHelper.readDb()
    return db.User
}

const GetById = async(id) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex( (user) => user.id === id )
    if ( index === -1 ) {
        throw new Error("Not Found")
    }
    return db.User[index]
}

export default {
    GetAll,
    GetById
}