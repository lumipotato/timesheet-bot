require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.SERVER_PORT

const router = require('./routes/router');
require('./bot/bot')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);

const server = app.listen(PORT, () => {console.log(`Telegram bot running on port ${PORT}`)});

function handleShutdownGracefully() {
  console.info("\nclosing server gracefully...");
  server.close(() => {
    console.info("server closed.");
    process.exit(0);
  });
}

process.on("SIGINT", handleShutdownGracefully);
process.on("SIGTERM", handleShutdownGracefully);
process.on("SIGHUP", handleShutdownGracefully);