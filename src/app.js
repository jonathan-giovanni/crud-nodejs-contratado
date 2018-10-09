// librerias
const express = require('express');
const path    = require('path');
const morgan  = require('morgan');
const mysql   = require('mysql');
const myConnection = require('express-myconnection');
const app     = express();

//importando rutas
const routeIndex       = require('./routes/index');
const routeCategory    = require('./routes/category');
const routeSubCategory = require('./routes/subcategory');

//configuraciones de express
app.set('port', process.env.PORT || 3000 );
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password: 'admin',
    port:3306,
    database:'contratado',
    multipleStatements: true
},'single'));


//decodificar datos
app.use(express.urlencoded({extended: false}));

//rutas

app.use('/',routeIndex); //cuando vaya a la raiz del proyecto
app.use('/category',routeCategory); //cuando vaya a la raiz del proyecto
app.use('/subcategory',routeSubCategory); //cuando vaya a la raiz del proyecto


//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//iniciando el servidor
app.listen(app.get('port'),() => {
   console.log(`server activo en ${app.get('port')}`);
});
