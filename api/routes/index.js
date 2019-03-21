const express = require("express");
const body = require("body-parser");
const UserGetController = require("../controllers/UserGetController");
const UserPostController = require("../controllers/UserPostController");

try {
    const server = express();

    server.use(body.json());
    server.get("/api/user", UserGetController);
    server.post("/api/user", UserPostController);

    module.exports = server;
} catch (err) {
    console.error("API error: ", err);
}
