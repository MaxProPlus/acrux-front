//Объект для работы с api сервера
class Api {
    // Получить информацию главной страницы
    get() {
        return fetch('/api/info').then(r=>r.json()).then(r=>{
            if (r.status !== 'OK') {
                return Promise.reject(r.errorMessage)
            }
            return r.results
        })
    }

    // Отправка ip пользователя
    ping() {
        return fetch('/api/ping', {
            method: 'POST'
        }).then(r=>r.json()).then(r=>{
            if (r.status !== 'OK') {
                return Promise.reject(r.errorMessage)
            }
            return r.results
        })
    }

    // Роут на обновление лого
    updateLogo(formData) {
        return fetch('/api/logo', {
            method: 'PUT',
            body: formData
        }).then(r=>r.json()).then(r=>{
            if (r.status !== 'OK') {
                return Promise.reject(r.errorMessage)
            }
            return r.results
        })
    }

    // Роут на обновление заголовка
    updateInfo(info) {
        return fetch('/api/info', {
            method: 'PUT',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(r=>r.json()).then(r=>{
            if (r.status !== 'OK') {
                return Promise.reject(r.errorMessage)
            }
            return r.results
        })
    }

    // Роут на получение списка пользователей
    getIp() {
        return fetch('/api/ip').then(r=>r.json()).then(r=>{
            if (r.status !== 'OK') {
                return Promise.reject(r.errorMessage)
            }
            return r.results
        })
    }
}