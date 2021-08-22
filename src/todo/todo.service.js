const db = require('../db/connection')
const table = 'todo'

function list() {
  return db
    .from(table)
    .select(
      'todo.id',
      'todo.title',
      'todo.completed',
    )
}

function read(todo_id) {
  return db
    .from(table)
    .select(
      'todo.id',
      'todo.title',
      'todo.completed',
    )
    .where('todo.id', todo_id)
    .first()
}

function create(newTodo) {
  return db
    .insert(newTodo)
    .into(table)
    .returning('*')
    .then(rows => {
      return rows[0]
    })
}

function update(todo_id, newTodo) {
  return db(table)
    .where({id: todo_id})
    .update(newTodo, returning=true)
    .returning('*')
}

function destroy(todo_id) {
  return db(table)
    .where({'id': todo_id})
    .delete()
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
}