const request = require('supertest');
const app = require('../app');

beforeAll(() => {
  return request(app).delete('/starred-repositories')
});

describe('CRUD TAGS', () => {

const repo1 = {
  user_id: '123456',
  repo_id: '2222222',
  tags: 'Front-end React',
  description: 'ReactJS',
  name: 'Repositorio ReactJS',
  url:'https://github.com/facebook/react'
}

const repo2 = {
  user_id: '123456',
  repo_id: '3333333',
  tags: 'React',
  description: 'ReactJS',
  name: 'Repositorio ReactJS',
  url:'https://github.com/facebook/react'
}

  it('should be able to create tags', async () => {
    const response = await 
    request(app)
    .post('/starred-repositories')
    .send(repo1)

    expect(response.body).toMatchObject(repo1);

    const response2 = await 
    request(app)
    .post('/starred-repositories')
    .send(repo2)

    expect(response2.body).toMatchObject(repo2);
    expect(response.status).toBe(201)

    global.idForTest = response.body.id;
    global.id2ForTest = response2.body.id;
  })

  it('should be able to list all user tags', async () => {
    const response = await 
    request(app)
    .get(`/starred-repositories/${repo1.user_id}`);

    expect(response.body).toMatchObject([repo1, repo2]) ;
    expect(response.status).toBe(200);
  })

  it('should be able to filter repositories by tags', async () => {
    const filter = 'Reac';
    
    const response = await 
    request(app)
    .get(`/starred-repositories/${filter}/${repo1.user_id}`);
  
    expect(response.body).toMatchObject([repo1, repo2]); 
    expect(response.status).toBe(200);
  })

  it('should be able to edit a tag', async () => {
    const response = await 
    request(app)
    .put('/starred-repositories')
    .send({
      tags: 'Updated tag',
      id: idForTest
    });

    expect(response.body).toMatchObject({
      id: idForTest,
      user_id: '123456',
      repo_id: '2222222',
      tags: 'Updated tag'
    });

    expect(response.status).toBe(200);
  })

  it('should be able to remove a tag', async () => {
    const response = await 
    request(app)
    .delete(`/starred-repositories/${id2ForTest}`);

    expect(response.body).toMatchObject({
      message: 'Deleted with success!'
    });

    expect(response.status).toBe(200);
  })

  it('should not be able to create duplicate tags', async () => {
    
    const newRepo = {
      ...repo1,
      tags: 'Updated tag'
    }
    
    const response = await 
    request(app)
    .post('/starred-repositories')
    .send(newRepo);

    expect(response.body).toMatchObject({
      message: 'this tag already exists!'
    });

    expect(response.status).toBe(400);
  })
})
 

