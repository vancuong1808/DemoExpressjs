import mongoose from 'mongoose'

class Database {

  async connect(connectString) {
    if (!connectString) {
      throw new Error('MongoDB connection string is not provided')
    }
    try {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })

      await mongoose.connect(connectString)

      console.log('Connected to MongoDB successfully!')
    } catch (error) {
      console.error('MongoDB connection error:', error.message)
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongoDB = Database.getInstance()
export default instanceMongoDB