import http from 'http'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv';


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { logger } from './services/logger.service.js'
logger.info('server.js loaded...')

const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
    console.log('__dirname: ', __dirname)
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5174', 'http://localhost:5174', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


// import { userRoutes } from './api/user/user.routes.js'
import { chapterRoutes } from './api/chapter/chapter.routes.js'
import { searchRoutes } from './api/search/search.routes.js'
// app.use('/api/user', userRoutes)
app.use('/api/chapter', chapterRoutes)
app.use('/api/search', searchRoutes)


app.get('/**', (req, res) => {
    // console.log('hi');
    res.sendFile(path.resolve('public/index.html'))
})


const port = process.env.PORT || 3030
server.listen(port, () => {
    console.log(`Server listening on port http://127.0.0.1:${port}/`)
})