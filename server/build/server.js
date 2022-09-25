import express from "express";
const app = express();
app.get("/ads", (request, response) => {
    return response.json([
        { "id": 1, "name": "John", "email": "john@example.com" },
        { "id": 2, "name": "David", "email": "david@example.com" },
        { "id": 3, "name": "Erick", "email": "erick@example.com" }
    ]);
});
app.listen(3333);
