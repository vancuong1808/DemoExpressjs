import User from '../models/user.model.js'
import { ObjectId } from 'mongodb'

class UserService {
  constructor() {
    this.user = User
  }

  async GetAll() {
  }

  async GetById(id) {
  }

  async Create(user) {
  }

  async Update(id, user) {
  }

  async Delete(id) {
  }
}

export default new UserService()
