import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import path from 'path'
import express from 'express'
import 'express-async-errors'
import Routes from './routes'
import Connection from "./lib/mysql"

// Init express
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(fileUpload())

// Инициализация соеденения с бд
const connection = new Connection()

// Для отдачи загруженных файлов
app.use(express.static(path.join(__dirname, './public')))
// Для отдачи статики
app.use(express.static(path.join(__dirname, '../upload')))

// Инициализация роутов
app.use(Routes(connection))

export default app
