const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const fortune = require("../lib/fortune");

//configurate mechanism views of Handlebars
app.engine(
  "handlebars",
  expressHandlebars.create({
    defaultLayout: "main",
  }).engine
);

app.use(express.static(__dirname + "/public"));

app.set("view engine", "handlebars");

app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) => {
  res.render("about", { fortune: fortune.getFortune() });
});

//user page 404
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

//use page 500
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

app.listen(port, () =>
  console.log(
    `Express run on http://localhost:${port}` + "\npress Ctrl+C for ending"
  )
);
