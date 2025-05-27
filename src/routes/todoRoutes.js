import express from 'express'
import db from '../db.js'


const router = express.Router()

// Get all todos from the logged-in user
router.get('/', (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId)
    res.json(todos)
})
// Create a new todo
router.post('/', (req, res) => {
    const { task } = req.body
    const insertTodo = db.prepare(`INSERT INTO todos(user_id, task) VALUES(?, ?)`)
    insertTodo.run(req.userId, task)

    res.json({id: insertTodo.lastId, task, completed: 0})
})
// Update a todo
router.put('/:id', (req, res) => {

})
// Delete a todo
router.delete('/:id', (req, res) => {

})
 
export default router
