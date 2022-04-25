const express = require('express');
const expressSession = require('express-session')

const app = express();

const session = expressSession({
  secret: 'coding is awesome',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
})
app.use(express.json());
app.use(session)

const port = process.env.PORT || 3030;

const gameRoutes = require('./api/song/game.routes')

app.use('/api', gameRoutes);
connectSockets(http, session)

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
