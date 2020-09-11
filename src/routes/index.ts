import {Request, Response, Router} from 'express'
import path from "path"
import AdminController from '../controllers/AdminController'
import Connection from "../lib/mysql"

const Routes = (connection: Connection) => {

    const router = Router()

    // Главная страница
    router.get('/', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../views/index.html'))
    })

    // Главная страница
    router.get('/admin', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../views/admin.html'))
    })

    // Контреллер для админки и мониторинга
    const adminController = new AdminController(connection)

    router.get('/api/info', adminController.get)
    router.put('/api/info', adminController.update)
    router.put('/api/logo', adminController.updateLogo)
    router.get('/api/ip', adminController.getIp)
    router.post('/api/ping', adminController.ping)

    // Для не найденных роутов
    router.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../views/404.html'))
    })

    return router

}

export default Routes
