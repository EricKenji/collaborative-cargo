const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ });

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`User connected on socket ${socket.id}`);
  socket.emit('message', `Welcome to Collaborative Cargo`);

  socket.broadcast.emit('message', `A user has connected`);

  socket.on('disconnect', () => {
    io.emit('message', `A user has left`);
  })

  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  })
})

const PORT = process.env.PORT || 3001;

const session = require('express-session');
const router = require('./routes/home-routes');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});