
const StarredRepositories = require('../models/StarredRepositories')

module.exports = {

  async index(req, res) {   
    try {
      const results = await StarredRepositories.all();
      const respositories = results.rows;
      return res.status(200).json(respositories);

    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },

  async findby(req, res) {
    try {
      const { filter, id } = req.params;
      const results = await StarredRepositories.findBy(filter, id);
      const respositories = results.rows;
      return res.status(200).json(respositories);

    } catch (error) {
      return res.status(404).json({ message: error });
    }
  },

  async post(req, res) {
    try {
      const results = await StarredRepositories.create(req.body);
      const repository = results.rows[0];
      return res.status(201).json(repository);

    } catch (error) {
      return res.status(400).send({ message: 'this tag already exists!'});
    }
  },

  async show(req, res) {   
    try {
      const results = await StarredRepositories.find(req.params.id);
      const repositories = results.rows;
      return res.status(200).json(repositories);
    } catch (error) {

      console.log(error);
      return res.status(404).json({ message: error});
    }
  },

  async put(req, res) {
    try {
      const results = await StarredRepositories.update(req.body);
      const repository = results.rows[0];
      return res.status(200).json(repository);       
      
    } catch (error) {
      return res.status(400).json({ message: 'this tag already exists!'});
    }     
  },

  async delete(req, res) {
    try {     
      const results = await StarredRepositories.delete(req.params.id);
      if(results.rowCount > 0) {
        return res.status(200).json({ message: 'Deleted with success!' });
      }
    } catch (error) {
      return res.status(404).json({ message: 'tag not found!'});
    }
  },
}
