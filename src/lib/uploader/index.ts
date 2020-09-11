import path from 'path'
import fs from 'fs'
import crypto from "crypto"

type FileInfo = {
    url: string
    path: string
}

class Uploader {
    // Подготовить файл к сохранению, сформировать путь и url
    getInfo = (file: any, url: string): FileInfo => {
        url = '/' + url
        const filePath = path.join(__dirname, '../../../upload/' + url)
        const fileName = this.getHashWithSalt(file.md5) + '.' + file.name.split('.').pop()
        return {
            url: path.join(url, fileName),
            path: path.join(filePath, fileName)
        }
    }

    // Получить рандомное названия файла
    getHashWithSalt = (data: string) => {
        return crypto.createHash('md5').update(data + Math.random().toString()).digest('hex')
    }

    // Удалить файл
    remove = (url: string) => {
        try {
            fs.unlinkSync(path.join(__dirname, '../../../upload/', url))
        } catch (e) {
            console.error(e)
        }
    }
}

export default Uploader