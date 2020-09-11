import Repository from "./repository"
import {Info} from "../../types"
import Uploader from "../../lib/uploader"
import {UploadedFile} from "express-fileupload"
import Connection from "../../lib/mysql"

class Model {
    private repository: Repository
    private uploader: Uploader = new Uploader()

    constructor(connection: Connection) {
        this.repository = new Repository(connection)
    }

    // Получить информацию о сайте
    get = () => {
        return this.repository.select()
    }

    // Обновить информацию о сайте
    update  = (info: Info) =>{
        return this.repository.update(info)
    }

    // Обновить лого
    updateLogo  = async (file: UploadedFile) =>{
        // Получить старое лого и удалить его
        const {urlLogo}: Info = await this.get()
        this.uploader.remove(urlLogo)

        // Сохранить новое лого
        let infoLogo
        infoLogo = this.uploader.getInfo(file, 'logo')
        file.mv(infoLogo.path)
        return this.repository.updateLogo(infoLogo.url)
    }
}

export default Model