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

const Create = async(user) => {
    const db = await DbHelper.readDb()
    db.User.push( user )
    await DbHelper.writeDb( db )
    const index = db.User.findIndex( (user) => user.id === user.id )
    if ( index === -1 ) {
        throw new Error("Not Found")
    }
    return db.User[index]
}

const Update = async(id, user) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex( (user) => user.id === id )
    if ( index === -1 ) {
        throw new Error("Not Found")
    }
    db.User[index] = { ...db.User[index], ...user }
    await DbHelper.writeDb( db )
    return db.User[index]
}

const Delete = async(id) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex( (user) => user.id === id )
    if ( index === -1 ) {
        throw new Error("Not Found")
    }
    db.User.splice(index, 1)
    await DbHelper.writeDb( db )
    return true
}

export default {
    GetAll,
    GetById,
    Create,
    Update,
    Delete
}