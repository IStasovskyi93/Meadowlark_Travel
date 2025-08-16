const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;

const fortunes = [
  "Победи свои страхи, или они победят тебя.",
  "Рекам нужны истоки.",
  "Не бойся неведомого.",
  "Тебя ждет приятный сюрприз.",
  "Будь проще везде, где только можно.",
];

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
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
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
