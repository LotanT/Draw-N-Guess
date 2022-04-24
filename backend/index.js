const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3030;

const gameRoutes = require('./api/game/game.routes')
app.use('/api', gameRoutes);

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
