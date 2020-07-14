const db = require('../config/db')

module.exports = {
 
  delete() {
    return db.query(`DELETE FROM starred`)
  },
}


