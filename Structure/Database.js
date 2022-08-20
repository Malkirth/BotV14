const mysql = require("mysql");
const Database = new mysql.createPool({
    host: "",
    user: "",
    password: "",
    database: "",
    charset: 'utf8mb4'
});

console.log("Base de donnée connectée avec succès")

module.exports = Database;