const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util'); // CONVIERTE CALLBACKS A PROMESAS O A ASYNC/AWAIT YA QUE NODE NO LOS SOPORTA

const pool = mysql.createPool(database);
pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTION');
        }
        if(error.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) {
        connection.release();
    console.log('DB IS CONNECTED')  
    } 
})

pool.query = promisify(pool.query); //CUANDO SE REALICE UNA CONSULTA A LA BASE DE DATOS SE PODRÁ USAR PROMERAS O ASYNC/AWAIT

module.exports = pool;