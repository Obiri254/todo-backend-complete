import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()

const PORT = process.env.PORT || 5000

// get the file path from the url of the current module
const __filename = fileURLToPath(import.meta.url)
// get the dir from the file path
const __dirname = dirname(__filename)

// middleware
app.use(express.json())
// serves the HTML file from the /public dir
// tells express to serve all files from public folder as static assets/files. Any request for the css will be resolved in the public dir
app.use(express.static(path.join(__dirname, '../public')))

// serving the HTML file from the /public dir
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => {
    console.log(`server has started at port: ${PORT}`)
})