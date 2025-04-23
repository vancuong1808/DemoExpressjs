import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DBNAME
if(!uri || !dbName) {
    throw new Error("MongoDB URI or DB name not provided in .env file");
}
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function connectDB() {
    try {
        await client.connect()
        console.log("Connected to MongoDB")
        return client.db(dbName)
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
        throw error
    }
}

async function getDB() {
    try {
        const db = await connectDB()
        return db
    } catch (error) {
        console.error("Error getting MongoDB instance", error)
        throw error
    }
}

async function closeDB() {
    try {
        await client.close()
        console.log("MongoDB connection closed")
    } catch (error) {
        console.error("Error closing MongoDB connection", error)
        throw error
    }
}


export default {
    connectDB,
    getDB,
    closeDB
}