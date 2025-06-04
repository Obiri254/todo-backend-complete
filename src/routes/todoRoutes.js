import express from 'express'
import db from '../db.js'
import { Prisma } from '@prisma/client'


const router = express.Router()

// Get all todos from the logged-in user
router.get('/', async(req, res) => {
    const todos = await Prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todos)
})
// Create a new todo
router.post('/', async(req, res) => {
    const { task } = req.body
    const todo = await Prisma.todo.create({
        data: {
            task,
            userId: req.userId
        }
    })

    res.json(todo)
})
// Update a todo
router.put('/:id', async(req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = await Prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !! completed
        }
    })

    res.json(updatedTodo)
})
// Delete a todo
router.delete('/:id', async(req, res) => {
    const { id } = req.params
    const userId = req.userId
    await Prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })
    res.send({message: "Todo deleted"})
})
 
export default router
