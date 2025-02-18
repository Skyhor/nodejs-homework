const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
const dotenv = require("dotenv");
const authRouter = require("./routes/api/auth");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //* С помощью app.use(express.json()) учим node.js распознавать json формат
app.use(express.static("public")); // * Мидлвар для возврата статичных файлов из папки public

app.use("/api/contacts", contactsRouter);

app.use("/api/auth", authRouter);
// * Любой запрос который начинаеться с /api/auth ищет обрабочие звесь - authRouter

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
