const db = require('../config/db')

module.exports = {
  all() {
    return db.query(`SELECT * FROM starred`)
  },
  
  create(data) {
    const query = `
        INSERT INTO starred (
          user_id,
          repo_id,
          tags,
          description,
          name,
          url
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, user_id, repo_id, tags, description, name, url
    `
    const values = [
        data.user_id,
        data.repo_id,
        data.tags,
        data.description,
        data.name,
        data.url
    ]

    return db.query(query, values)     
  },

  findBy(filter, id) {
    return db.query(`SELECT * FROM starred WHERE user_id = $1 
    AND tags ILIKE '%${filter}%'`, [id])
},

  find(id) {
    return db.query('SELECT * FROM starred WHERE user_id = $1', [id])
  },
 
  update(data) {
    const query = `
    UPDATE starred SET
      tags=($1)
    WHERE id=($2) 
    RETURNING id, user_id, repo_id, tags         
    `
    const values = [
      data.tags,
      data.id,
    ]
    return db.query(query, values)
  },

  delete(id) {
    return db.query(`DELETE FROM starred WHERE id = $1`, [id])
  },
}


