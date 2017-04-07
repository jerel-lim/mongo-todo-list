// TODO. import TODO Model ;-)
const Todo = require('../models/todo')
var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/todo'
mongoose.Promise = global.Promise

function create (params) {
  // create a new TODO and console log the response
  mongoose.connect(dbURI)
  var newTodo = new Todo()

  newTodo.name = params.name
  newTodo.description = params.description
  newTodo.completed = params.completed

  if (!params.description || params.description === '') {
    params.description = 'default description'
  }
  if (!params.completed || params.completed === '') {
    params.completed = false
  }
  if (params.name.length >= 5) {
    newTodo.save(function (err, data) {
      if (err) console.error(err)
      console.log(data)
      mongoose.disconnect()
    })
  } else {
    mongoose.disconnect()
    // return false
  }
}

function list () {
  // console log the list of all TODOs
  mongoose.connect(dbURI)
  Todo.find({}, function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
    } else {
      console.log(data)
      mongoose.disconnect()
    }
  })
}
function show (id) {
  // find the TODO with this id and console log it
mongoose.connect(dbURI)
  Todo.find().where('_id').equals(id).exec(function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
    } else {
      console.log(data)
      mongoose.disconnect()
    }
  })
}

function update (id, params) {
  // find the TODO with this id and update it's params. console log the result.
  mongoose.connect(dbURI)
  if (params.name.length >= 5) {
    Todo.findByIdAndUpdate(id, {$set: params}, {new: true}, function (err, data) {
      if (err) {
        console.error(err)
        mongoose.disconnect()
        // return false
      }
      else{
        console.log(data)
        mongoose.disconnect()
        // return true
      }
    })
  }
  else {
    mongoose.disconnect()
    // return false
  }




}
function destroy (id) {
  // find the TODO with this id and destroy it. console log success/failure.
  mongoose.connect(dbURI)
  Todo.findByIdAndRemove(id, function (err, data) {
      if (err) {
        console.error(err)
        mongoose.disconnect()
        // return false
      }
      else{
        console.log(data)
        mongoose.disconnect()
        // return true
      }
    })
}

function destroyAll () {
  mongoose.connect(dbURI)
  Todo.remove({}, function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
      // return false
    }
    else{
      console.log(data)
      mongoose.disconnect()
      // return true
    }
  })
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
