import userService from "../services/user.service.js"

class UserController {
  async GetAll(req, res, next) {
    try {
      const users = await userService.GetAll()
      return res.render('home', { users })
    } catch (error) {
      next(error)
    }
  }

  async GetById(req, res, next) {
    try {
      const id = req.params.id
      const user = await userService.GetById(id)
      if (!user) {
        return res.status(404).json("Not Found")
      }
      return res.status(200).json({ data: user })
    } catch (error) {
      next(error)
    }
  }

  async Create(req, res, next) {
    try {
      const body = req.body
      const newUser = await userService.Create(body)
      if (!newUser) {
        return res.status(400).json("Bad Request")
      }
      return res.status(201).json({ data: newUser })
    } catch (error) {
      next(error)
    }
  }

  async Update(req, res, next) {
    try {
      const id = req.params.id
      const body = req.body
      const updatedUser = await userService.Update(id, body)
      if (!updatedUser) {
        return res.status(404).json("Not Found")
      }
      return res.status(200).json("Updated Successfully")
    } catch (error) {
      next(error)
    }
  }

  async Delete(req, res, next) {
    try {
      const id = req.params.id
      const deleted = await userService.Delete(id)
      if (!deleted) {
        return res.status(404).json("Not Found")
      }
      return res.status(200).json("Deleted Successfully")
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
