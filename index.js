const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8000;
const route = require('./src/routes');
const bodyParser = require('body-parser');
const db =  require('./src/config/db')

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

// Config static file
app.use(express.static(path.join(__dirname, '/public')));
// Use middleware for send data from client
// Use for form
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// Use for js from XLMHttpRequest, fetch, axios, ajax,...
app.use(express.json());

// Use morgan
app.use(morgan('combined'))

// Connect db
db.connect()

// Use Route
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
