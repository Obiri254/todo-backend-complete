import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Prisma } from '@prisma/client'

const router = express.Router()

// register a new user endpoint /auth/register
router.post('/register', async(req, res) => {
    const {username, password} = req.body

    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)
    // To save new user and hashedPassword to the db
    try {
        const user = await Prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })
        // Add their first todo for them
        const defaultTodo = 'Hello :) Add your first todo'
        await Prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        // create a token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
}) 

router.post('/login', async(req, res) => {
    const {username, password} = req.body

    try {
        const user = await Prisma.user.findUnique({
            where: {
                username: username
            }
        })
        // if we cannot find a user associated with that username we return out of that function
        if (!user) {return res.status(404).send({message: "user not found!"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if password does not match, return out of the function
        if (!passwordIsValid) {return res.status(401).send({message: "invalid password"})}
        // case of a successful authentication
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
})


export default router