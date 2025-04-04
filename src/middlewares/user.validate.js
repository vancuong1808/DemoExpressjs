
export const ValidateUserId = async( req, res, next ) => {
    try {
        const id = parseInt( req.params.id )
        if ( id <= 0 ) {
            throw new Error("ID invalid")
        }
        next()
    } catch (error) {
        next( error )
    }
}