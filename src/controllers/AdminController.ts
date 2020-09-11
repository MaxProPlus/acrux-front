import {Request, Response} from 'express'
import AdminModel from "../models/admin/model"
import {Info} from "../types"
import {UploadedFile} from "express-fileupload"
import Connection from "../lib/mysql"

class AdminController {
    private adminModel: AdminModel
    private ips: {exp:number, ip:string}[] = []
    private timeClean = 5000 // таймер очистки
    private timeExp = 5000 // Время истечение ip

    constructor(connection: Connection) {
        this.adminModel = new AdminModel(connection)
        setTimeout(this.clearIp, this.timeClean)
    }

    // Удалять ip старше timeExp ms каждые timeClean ms
    clearIp = () => {
        this.ips = this.ips.filter(el=>el.exp+this.timeExp>Date.now())
        setTimeout(this.clearIp, this.timeClean)
    }

    // Получить информацию
    get = (req: Request, res: Response) => {
        return this.adminModel.get().then((r: Info) => {
            return res.json({
                status: 'OK',
                results: r
            })
        }, () => {
            return res.json({
                status: 'ERROR',
                errorMessage: 'Ошибка',
            })
        })
    }

    // Получить список ip
    getIp = (req: Request, res: Response) => {
        return res.json({
            status: 'OK',
            results: this.ips.map(el=>el.ip)
        })
    }

    // Роут для отслеживания пользователей на сайте
    ping = (req: Request, res: Response) => {
        const ip = this.ips.find((el) => el.ip === req.ip.split(':')[3])
        if (!ip) {
            this.ips.push({
                ip: req.ip.split(':')[3],
                exp: Date.now()
            })
        } else {
            ip.exp = Date.now()
        }
        return res.json({
            status: 'OK'
        })
    }

    // Изменение текста и заголовка
    update = (req: Request, res: Response) => {
        const info: Info = req.body
        return this.adminModel.update(info).then(() => {
            return res.json({
                status: 'OK',
            })
        }, () => {
            return res.json({
                status: 'ERROR',
                errorMessage: 'Ошибка',
            })
        })
    }

    // Изменение лого
    updateLogo = (req: Request, res: Response) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.json({
                status: 'INVALID_DATA',
                errorMessage: 'Не прикреплен файл',
            })
        }
        return this.adminModel.updateLogo(req.files.logo as UploadedFile).then(() => {
            return res.json({
                status: 'OK',
            })
        }, (err) => {
            return res.json({
                status: 'ERROR',
                errorMessage: err,
            })
        })
    }
}

export default AdminController
