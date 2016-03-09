var express = require("express");//web server host
var bodyParser = require("body-parser");//middleware
var _ = require("underscore");//refactoring helper

var app = express();
var PORT = process.env.PORT || 3000;//uses port 3000 for local purposes or the natural port for heroku, etc.
var todos = [];//the array of todo items
var todoNextId = 1;//the id of the todo items starts at 1

app.use(bodyParser.json());


//returns all todos
app.get("/", function (req, res) {
  res.send("Todo API Root");//home page
});

app.get("/todos", function (req, res) {
  res.json(todos);//returns all the items in the todos array
});

//returns todo corresponding to id
app.get("/todos/:id", function (req, res) {
  var todoId = parseInt(req.params.id, 10);//params.id is the id of the todo that is passed in through the url
  var matchedTodo = _.findWhere(todos, {id: todoId});//returns the todo object with the corresponding id number

  if(matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
});

//user can add todos onto the list
app.post("/todos", function (req, res) {
  var body = _.pick(req.body, "description", "completed");//filters the req JSON for only its description and completed fields

  //data validation
  if((!_.isBoolean(body.completed)) || (!_.isString(body.description)) || (body.description.trim().length === 0)) {
    return res.status(400).send();
  }

  body.description = body.description.trim();//trims the value of description, gets rid of unneccessary spaces

  //at this point, the JSON is fully trimmed and filtered for only the neccessary information

  body.id = todoNextId++;
  todos.push(body);
  res.json(body);
});

//sets the app to listen on port 3000
app.listen(PORT, function () {
  console.log("Express listening on Port "+PORT);
});
