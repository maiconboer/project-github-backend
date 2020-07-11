
const StarredRepositories = require('../models/StarredRepositories')

module.exports = {
  async index(req, res) {   
    try {
      const results = await StarredRepositories.all()
      const respositories = results.rows
    
      return res.json(respositories)
    } catch (error) {
      console.log(error);
    }

    
  },

  async findby(req, res) {
    try {
      const { filter, id } = req.params
      const results = await StarredRepositories.findBy(filter, id)
      const respositories = results.rows
    
      return res.json(respositories)
    } catch (error) {
      console.log(error);
    }
    
  },

  async post(req, res) {
    try {
      const results = await StarredRepositories.create(req.body)
      const repository = results.rows[0]
      return res.json(repository)

    } catch (error) {
      console.log(error);
    }
  },

  async show(req, res) {   
    try {
      const results = await StarredRepositories.find(req.params.id)
      const repositories = results.rows

      return res.json( repositories )
    } catch (error) {
      console.log(error);
    }
  },

  async put(req, res) {
    try {
      const results = await StarredRepositories.update(req.body)
      const repository = results.rows[0]
      return res.json(repository)        
      
    } catch (error) {
      console.log(error);
    }     
  },

  async delete(req, res) {
    try {     
      const results = await StarredRepositories.delete(req.params.id)
      if(results.rowCount > 0) {
        return res.json({ message: 'Deleted with success!' })
      }
        
    } catch (error) {
      console.log(error);
    }
  },
}
