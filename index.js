const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const bodyParser = require('body-parser');


const run = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "abarrotestid31m",
    port: 3306,
});

const server = express();
server.use(cors());

server.use(bodyParser.json());

server.get("/", (req, res) => {
    console.log("GET /");
    res.send("hola mundo");
});

server.get("/user", (req, res) => {
    run.query('SELECT * FROM alumnos', (err, resultados) => {
        if (err) {
            console.log("No se pudo acceder a la tabla", err);
        } else {
            console.log("Se accedió a la tabla");
            res.send(resultados);
        }
    });
});
server.get("/user/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    
    run.query("SELECT * FROM alumnos WHERE idAlumno=?", [id], (err, resultados) => {
        if (err) {
            console.log("No se pudo acceder a la tabla", err);
        } else {
            console.log("Se accedió a la tabla");
            res.send(resultados);
        }
    });
});


server.post("/user", (req, result) => {
    const { NNombre, GGrado } = req.body;
    run.query("INSERT INTO alumnos (Nombre, grado) VALUES (?, ?)", [NNombre, GGrado], (err, result) => {
        if (err) {
            console.log("Error al insertar en la tabla", err);
        } else {
            console.log("Datos insertados correctamente");
        }
    });
});

server.listen(3000,
     () => {
    console.log("Server is running on port 3000");
});


