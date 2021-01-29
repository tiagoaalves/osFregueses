var express = require('express');
var path = require('path');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./config/connection');
const adminsRouter = require('./routes/admins.route.js');
const sociosRouter = require('./routes/socios.route.js');
var engine = require('consolidate');
const expressSanitizer = require('express-sanitizer');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const session = require("express-session");

var app = express();

global.connection = mysql.createConnection({
    host: connection.host,
    port: connection.port,
    user: connection.user,
    password: connection.password,
    database: connection.database
});

global.connection.connect(function(err) {
  if (!err){
  console.log('You are now connected to MySQL...');
  }
});


app.use(expressSanitizer());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/admins/', adminsRouter);
app.use('/api/socios/', sociosRouter);
app.use(express.static(path.join(__dirname, 'views', "templateVisitante")));
app.use(express.static(path.join(__dirname, 'views', "templateAdmin")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

passport.applyTo(app);
//passport.addUsersDataToViews(app);

app.listen(process.env.PORT, function(){
    console.log('listening on port 3000');
});

app.set('views', path.join(__dirname, 'views'));
app.engine('html', engine.mustache);
app.set('view engine', 'html');


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "views", "templateVisitante", "index.html"));
});

app.get('/admins', global.redirectIfNotLogged(), function(req, res){
    res.sendFile(path.join(__dirname, "views", "templateAdmin", "indexAdmin.html"));
});

app.get('/admins/admins', global.redirectIfNotLogged(), global.forbidIfNotLoggedAdmin(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsAdmins','admins.html'));
});

app.get('/admins/colaboradores', global.redirectIfNotLogged(), global.forbidIfNotLoggedAdmin(), function(req, res) {
    res.sendFile(path.join(__dirname, "views", 'viewsAdmins','colaboradores.html'));
});

app.get('/admins/associados', global.redirectIfNotLogged(), global.forbidIfNotLoggedAdmin(), function(req, res) {
    res.sendFile(path.join(__dirname, "views", 'viewsAdmins','associados.html'));
});

app.get('/admins/eventos', global.redirectIfNotLogged(), global.forbidIfNotLoggedAdmin(), function(req, res) {
    res.sendFile(path.join(__dirname, "views", 'viewsAdmins','eventos.html'));
});

app.get('/admins/patrocinadores', global.redirectIfNotLogged(), global.forbidIfNotLoggedAdmin(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsAdmins','patrocinadores.html'));
});

app.get('/admins/gerirData', global.redirectIfNotLogged(), global.forbidIfNotLoggedAdmin(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsAdmins','gerirData.html'));
});

app.get('/admins/pagamentos', global.redirectIfNotLogged(), global.forbidIfNotLoggedAdmin(), function(req, res) {
    res.sendFile(path.join(__dirname, "views", 'viewsAdmins','pagamentos.html'));
});

app.get('/admins/alterarDados', global.redirectIfNotLogged(), global.forbidIfNotLoggedAdmin(), function(req, res) {
    res.sendFile(path.join(__dirname, "views", 'viewsAdmins','alterarDados.html'));
});

app.get('/colabs', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views','templateColab','indexColab.html'));
});

app.get('/colabs/colaboradores', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsColab','colaboradores.html'));
});

app.get('/colabs/associados', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsColab','associados.html'));
});

app.get('/colabs/alterarDados', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsColab','alterarDados.html'));
});

app.get('/colabs/eventos', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsColab','eventos.html'));
});

app.get('/colabs/patrocinadores', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsColab','patrocinadores.html'));
});

app.get('/socio/eventos', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsAssoci','eventos.html'));
});

app.get('/socio', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'templateAssoci','indexAssoci.html'));
});

app.get('/socio/alterarDados', global.redirectIfNotLogged(), function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'viewsAssoci','alterarDados.html'));
});