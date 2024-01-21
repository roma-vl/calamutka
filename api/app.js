const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
  res.json({
    'title' : 'Home Route',
    'post' : [
      {
        'id' : 1,
        'title': 'Title 1',
      },
      {
        'id' : 2,
        'title': 'Title 2',
      }
    ]
  });
});
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
