import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DBNAME

class MongoDB {
  constructor() {
    this.client = null
    this.db = null
  }

  async connect() {
    try {
        if (!this.client) {
            this.client = new MongoClient(uri, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            })
      
            await this.client.connect()
            console.log("MongoDB connected")
            this.db = this.client.db(dbName)
          }
          return this.db
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
        throw error
    }
  }

  async getDB() {
    try {
        this.db = await connect()
        return this.db
    } catch (error) {
        console.error("Error getting MongoDB instance", error)
        throw error
    }
  }

  async close() {
    if (this.client) {
      await this.client.close()
      this.client = null
      this.db = null
      console.log("MongoDB connection closed")
    }
  }
}

const mongoInstance = new MongoDB()
export default mongoInstance
