'use strict'

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const TOKEN = process.env.TOKEN;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Testing 1, 2, 3'));

app.get('/tasks', (req, res) => {
  client.query(`SELECT * from tasks;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('/admin', (req, res) => res.send(TOKEN === parseInt(req.query.token)))
  // app.get('/admin', (req, res) => console.log(req.query.token))

app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.post('/tasks/add', (req, res) => {
  let { title, description, category, contact, status } = req.body;

  client.query(`
      INSERT INTO tasks(title, description, category, contact, status)
      VALUES ($1, $2, $3, $4, $5)`, [title, description, category, contact, status])
    .then(results => res.sendStatus(201))
    .catch(console.error);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// export PORT = 3000
// export CLIENT_URL = http: //localhost:8080
// export DATABASE_URL = postgres: //localhost:5432/task_app

// CREATE TABLE IF NOT EXISTS
// tasks(
//   task_id SERIAL PRIMARY KEY,
//   title VARCHAR(255),
//   description VARCHAR(255),
//   contact VARCHAR(255),
//   status VARCHAR(255),
//   category VARCHAR(255),
//   due VARCHAR(255)
// );

// INSERT INTO tasks(title, description, category, contact, status, due) VALUES(
//   'Feed the doggo',
//   'Make sure that Demi gets breakfastz and dinnarz on the sixes',
//   'demi.dog',
//   'twice daily',
//   'pets',
//    '2018-03-28');

// INSERT INTO tasks(title, description, category, contact, status, due) VALUES(
//   'Clean the litterboxes',
//   'Keep the kittehs happy by doing regular turd burgling',
//   'Find them in Fort Asshole',
//   'once daily',
//   'pets',
//    '2018-03-28' );

// INSERT INTO tasks(title, description, category, contact, status, due) VALUES(
//   'Take out the recycling',
//   'Make sure to take the recycling out Sunday nights before Monday AM pickup',
//   'me',
//   'as needed, and once weekly',
//   'house',
//    '2018-04-21');

// INSERT INTO tasks(title, description, category, contact, status, due) VALUES(
//   'Order pizza for Kim',
//   'Kim needs some pie at least once a week',
//   'me',
//   'once weekly',
//   'wife',
//    '2018-03-30');