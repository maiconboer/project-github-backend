
const StarredRepositoriesDeleteAll = require('../models/StarredRepositoriesDeleteAll')

module.exports = {
  async delete(req, res) {
    try {     
      await StarredRepositoriesDeleteAll.delete();
      
      return res.status(200).json({ message: 'Deleted with success!' });
    
    } catch (error) {
      return res.status(404);
    }
  },
}
