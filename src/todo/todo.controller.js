const service = require('./todo.service')
const path = require('path')
const xss = require('xss')

const serializeTodo = todo => ({
  id: todo.id,
  title: xss(todo.title),
  completed: todo.completed
})

function idIsValid(req, res, next) {
    if(isNaN(parseInt(req.params.todo_id))) {
        return res.status(404).json({
            error: { message: `Invalid id` }
        })
    } else {
        next()
    }
}

async function update(req, res) {
    const { todo_id } = req.params
    const { title, completed } = req.body
    const todoToUpdate = { title, completed }

    const numberOfValues = Object.values(todoToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'title' or 'completed'`
        }
      })

    const updated = await service.update(todo_id, todoToUpdate)
    res.status(200).json(serializeTodo(updated[0]))
}

async function read(req, res) {
    const todo = await service.read(req.params.todo_id)
    if (!todo) {
        return res.status(404).json({
        error: { message: `Todo doesn't exist` }
        })
    }
    res.json(serializeTodo(todo))
}

async function destroy(req, res) {
    const { todo_id } = req.params
    await service.destroy(todo_id)
    res.status(204).end()
}

module.exports = {
    update: [idIsValid, update],
    read: [idIsValid, read],
    destroy: [idIsValid, destroy],
}