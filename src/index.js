const express = require('express');
const app = express();
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session')
const mysqlStore = require('express-mysql-session') // Nos guarda la session en la BD
const passport = require('passport'); // se importa para poder user su codigo principal
const { database } = require('./keys');

// Initialization
require('./lib/passport');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

// middelwares  
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'nodeapp',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database) //Lugar donde se guarda la sesión memoria del servidor o en la base da datos
    // Se ha almacenado en la base de datos
}))
app.use(flash());

// INICIALIZAR PASSPORT
app.use(passport.initialize()); // se inicia
app.use(passport.session()) //guarda datos

// global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success'); // el mensaje se hace disponible en todas las vistas
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

// routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// public
app.use(express.static(path.join(__dirname, 'public')));


// starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
