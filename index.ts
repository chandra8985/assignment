import express from "express";
import bosyParse from "body-parser"
const app = express();
const port = process.env.PORT || 3000;
import { getUsers, getUserById, createUser, deleteUser } from './src/controller'

app.use(bosyParse.json())

app.get("/users", getUsers)
app.get("/users/:id", getUserById)
app.post("/users", createUser)
app.delete("/users/:id", deleteUser)

app.listen(port, () => console.log(`server running at port ${port}`))