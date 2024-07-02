const express = require('express');
const server = express();

server.get("/", (req , res) => {
    console.log("GET /");
    console.log(req.query);
    res.send("Hello world");

});

server.get("/user", (req, res) => {
    res.send("useraesi2145")
})
server.listen(3000, () =>{
    console.log("Server is running")
});