(() => {
    // Объект для работы с рест сервером
    const api = new Api()

    // Получить предыдущую информацию главной страницы
    api.get().then(r => {
        // Установить соответствующие данные в свои места
        document.getElementById('title').value = r.title
        document.getElementById('description').value = r.description
    }, err => {
        console.error(err)
    })

    // Событие при загрузке нового лого
    document.getElementById('logo').addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('logo', document.getElementById('file').files[0])
        api.updateLogo(formData).then(() => {
            alert('OK')
        }, err => {
            alert('Ошибка: ' + err)
        })
    })

    // Событие при изменение заголовка
    document.getElementById('info').addEventListener('submit', (e) => {
        e.preventDefault()
        const info = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value
        }
        api.updateInfo(info).then(() => {
            alert('OK')
        }, err => {
            alert('Ошибка: ' + err)
        })
    })

    // Таблица ip
    const table = document.getElementById('table')
    // функция на обновление таблицы
    const update = () => {
        api.getIp().then(r => {
            // Очистить таблицу
            for (let i = table.rows.length - 1; i > 0; i--) {
                table.rows[i].remove()
            }
            // Перебрать новые значения и записать в таблицу
            r.forEach((el, i) => {
                const tr = document.createElement('tr')

                const n = document.createElement('td')
                n.innerText = i + 1

                const ip = document.createElement('td')
                ip.innerText = el

                tr.append(n, ip)
                table.getElementsByTagName('tbody')[0].append(tr)
            })

            // Обновлять каждые 1 секунду
            setTimeout(update, 1000)
        }, err => {
            alert('Ошибка: ' + err)
        })
    }
    update()
})()