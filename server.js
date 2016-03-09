var express = require("express");
var bodyParser = require("body-parser");//middleware

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());


//returns all todos
app.get("/", function (req, res) {
  res.send("Todo API Root");
});

app.get("/todos", function (req, res) {
  res.json(todos);
});

//returns todo corresponding to id
app.get("/todos/:id", function (req, res) {
  var todoId = req.params.id;
  var matchedTodo;

  todos.forEach(function (todo) {
    if(todoId == todo.id) {
      matchedTodo = todo;
    }
  });

  if(matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
});

//user can add todos onto the list
app.post("/todos", function (req, res) {
  var body = req.body;
  body.id = todoNextId++;
  todos.push(body);
  res.json(body);
});

//sets the app to listen on port 3000
app.listen(PORT, function () {
  console.log("Express listening on Port "+PORT);
});
