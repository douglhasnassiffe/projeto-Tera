import express from "express"
import database from "./config/database.js"
import dotenv from "dotenv-safe"
import authRouter from "./routes/authRouter.js"

dotenv.config()

database.on("open", () => console.log("Conexão com o MongoDB feita com sucesso!"));
database.on("error", () => console.log("Conexão com o MongoDB quebrada! Houve um erro: "));

const app = express();
app.use(express.json())

// CAMINHO RAIZ DAS REQUESTS
app.use("/auth", authRouter)

export default app;
// module.exports = app;