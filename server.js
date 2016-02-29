var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
  id: 1,
  description: "Finish homework",
  completed: true
}, {
  id: 2,
  description: "Study for Calc Test",
  completed: false
}, {
  id: 3,
  description: "Study for Euro Test",
  completed: true
}];


app.get("/", function (req, res) {
  res.send("Todo API Root");
});

app.get("/todos", function (req, res) {
  res.json(todos);
});


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

app.listen(PORT, function () {
  console.log("Express listening on Port "+PORT);
});
