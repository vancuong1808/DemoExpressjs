import mongoInstance from '../configs/mongodb.config.js'
import { ObjectId } from 'mongodb'

class UserService {
  constructor() {
    this.collection = null
  }

  async init() {
    if (!this.collection) {
      const db = await mongoInstance.connect()
      this.collection = db.collection('collection')
    }
  }

  async GetAll() {
    await this.init()
    return this.collection.find().toArray()
  }

  async GetById(id) {
    await this.init()
    return this.collection.findOne({ _id: new ObjectId(id) })
  }

  async Create(user) {
    await this.init()
    const result = await this.collection.insertOne(user)
    return await this.collection.findOne({ _id: result.insertedId })
  }

  async Update(id, user) {
    await this.init()
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: user }
    )
    return result
  }

  async Delete(id) {
    await this.init()
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }
}

export default new UserService()
