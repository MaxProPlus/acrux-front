import {Info} from "../../types"
import Connection from "../../lib/mysql"

class Repository {
    private pool: any

    constructor(connection: Connection) {
        this.pool = connection.getPoolPromise()
    }


    select = (): Promise<Info> => {
        const sql = `SELECT title, description, url_logo as urlLogo from info`
        return this.pool.query(sql).then(([r]:[Info[]]) => {
            if (!r.length) {
                console.error('Не найдена запись')
                return Promise.reject('Не найдена запись')
            }
            return Promise.resolve(r[0])
        }, (err: any) => {
            console.error('Ошибка запроса к бд: ', err)
            return Promise.reject('Ошибка запроса к бд')
        })
    }

    update = (info: Info): Promise<any> => {
        const sql = `UPDATE info set title = ?, description = ?`
        return this.pool.query(sql, [info.title, info.description]).then(() => {
            return Promise.resolve()
        }, (err: any) => {
            console.error('Ошибка запроса к бд: ', err)
            return Promise.reject('Ошибка запроса к бд')
        })
    }

    updateLogo = (url: string): Promise<any> => {
        const sql = `UPDATE info set url_logo = ?`
        return this.pool.query(sql, [url]).then(() => {
            return Promise.resolve()
        }, (err: any) => {
            console.error('Ошибка запроса к бд: ', err)
            return Promise.reject('Ошибка запроса к бд')
        })
    }
}

export default Repository