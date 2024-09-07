const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const usersRouter = require("./routes/UserList");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(4020, () => {
    console.log("Server running on port 4020");
  });
});