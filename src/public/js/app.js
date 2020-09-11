(() => {
    //Объект для работы с api сервера
    const api = new Api()

    // Посылать ping каждые 2 секунд
    const ping = () => {
        // Возможно лучше бы использовать websocket?
        api.ping().then(() => {
            setTimeout(ping, 2000)
        }, err => {
            console.error(err)
        })
    }
    ping()

    // Получить информацию главной страницы
    api.get().then(r => {
        // Установить соответствующие данные в свои места
        document.getElementById('title').innerText = r.title
        document.getElementById('desc').innerText = r.description
        document.getElementById('logo').setAttribute('src', r.urlLogo)
    }, err => {
        console.error(err)
    })


    // Переменная отвечающая за показ меню
    let showMenu = false
    // Событие при клике на меню
    document.getElementById('menu').addEventListener('click', e => {
        console.log(e.target)
        if (!showMenu) {
            // Анимация перехода страницы
            document.getElementById('main').classList.add('hidden')
            document.getElementById('nav').classList.remove('hidden')

            // Анимация кнопки
            document.getElementById('menu').classList.add('menu-show')
            document.getElementById('menu-icon').classList.add('hidden-icon')
            document.getElementById('close-icon').classList.remove('hidden-icon')
        } else {
            // Анимация перехода страницы
            document.getElementById('nav').classList.add('hidden')
            document.getElementById('main').classList.remove('hidden')

            // Анимация кнопки
            document.getElementById('menu').classList.remove('menu-show')
            document.getElementById('menu-icon').classList.remove('hidden-icon')
            document.getElementById('close-icon').classList.add('hidden-icon')
        }
        showMenu = !showMenu
    })
})()