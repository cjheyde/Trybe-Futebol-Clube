# Trybe Futebol Cube (Soccer Club)

This Project shows a leaderboard of all soccer teams in a competition, and lets you add teams, matches, and scores.

Here I had to exercise: POO, TDD, Node.js, Express, Typescript, Sequelize, mySQL, docker.

This is a fullstack JavaScript Project, but the frontend came already coded by the school [Trybe](https://www.betrybe.com/).



# How to run it:

<details>
 <summary><strong> You need to have installed:</strong></summary><br />
 - Unix based Operational System <br />
 - node version >= 16.14.0 LTS <br />
 - Docker <br />
 - Docker-compose version >= 1.29.2
</details>
 
command: `npm install` <br />
Use Docker, command: `npm run compose:up`

Open frontend on http://localhost:3000/login <br />

  to login type:
*    login: admin@admin.com
*    senha(password): secret_admin



# Files/folders Ownership

#### Files/folders I coded myself:
  
    app/backend/src/ 
      controllers/
      database/
        migrations/ (except 99999999999999-create-z.js)
        Models/ (except ExampleModel.ts & index.ts)
      helpers/
      interfaces/
      middlewares/ (except error.middleware.ts)
      routes/
      services/
      tests/
    Dockerfile
  
  app/frontend/
    Dockerfile
    packages.npm
README.md


#### Files/folders I coded partially - the scholl has coded some of it:
app/
  backend/
    src/
      app.ts


#### Files/folders coded by a teacher or a teammate:
app/
  backend/
    helpers/
      BcryptService.ts -> ref. school class code
    middlewares/
      error.middleware.ts -> ref. school classes material and project revision class code


#### Files/folders coded by the school (@betrybe):
all others not mentioned above.


#### 🚧 README under construction 🚧
