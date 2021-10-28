const {format} = require('timeago.js')


const helpers = {};

helpers.timeago = (timestamp) => { //EL PARAMETRO TIMESTAMP ES EL  SE REQUIRE DE LA BASE DE DATOS PERO EN REALIDAD LO TOMARÁ DESDE LA VISTA    
    return format(timestamp); //TOMA EL TIMESTAMP Y LO CONVIERTE A FORMTATO DE... 2MIN AGO ETC    
}

module.exports = helpers;