const express = require("express");
const app = express();
const db = require("../models");
const routerUser = require("../routes/users.routes");
const routerPost = require("../routes/posts.routes");
const routerPost_Images = require("../routes/post_images.routes");
const routerTag = require("../routes/tags.routes");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", routerUser)
app.use("/post", routerPost)
app.use("/post_images", routerPost_Images)
app.use("/tag", routerTag)

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});