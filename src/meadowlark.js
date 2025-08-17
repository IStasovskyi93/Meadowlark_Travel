const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const fortune = require("../lib/fortune");
const handlers = require("../lib/handlers");

//configurate mechanism views of Handlebars
app.engine(
  "handlebars",
  expressHandlebars.create({
    defaultLayout: "main",
  }).engine
);

app.use(express.static(__dirname + "/public"));

app.set("view engine", "handlebars");

app.get("/", handlers.home);

app.get("/about", handlers.about);

//user page 404
app.use(handlers.notFound);

//use page 500
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () =>
    console.log(
      `Express run on http://localhost:${port}` + "\npress Ctrl+C for ending"
    )
  );
} else {
  module.exports = app;
}
