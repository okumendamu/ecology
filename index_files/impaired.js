function adaptiveFavoritesLanguage() {
    const element = document.getElementById('kwinston')
    if (element === null) return null

    let language = 'kaz'
    const languageUrl = document.location.pathname.split('/')[1]
    if (languageUrl === 'eng') language = 'eng'
    if (languageUrl === 'rus') language = 'rus'
    
    const registrationUrl = `/${language}/account/new`
    const loginUrl = `/${language}/account`

    if (language === 'eng') element.innerHTML = `<a href="${registrationUrl}">Please register or log into</a> your account. That way your favorites would not be lost and will be available on any computer. Favorites of a registered user are available <a href="${loginUrl}"> to that user only if he/she is logged in </a>.`
    if (language === 'rus') element.innerHTML = `<a href="${registrationUrl}">Зарегистрируйтесь</a> в личном кабинете. Тогда Ваше избранное не потеряется со временем и будет доступно с разных компьютеров. Избранное зарегистрированного пользователя доступно только ему самому, если он <a href="${loginUrl}">выполнил вход</a>.`
    if (language === 'kaz') element.innerHTML = `Жеке кабинетте <a href="${registrationUrl}">тіркеліңіз</a>. Сонда Сіздің таңдаулыңыз уақыт өткенімен жоғалмайды және кез келген компьютерлерден қолжетімді болады. Тіркелген пайдаланушының таңдаулысы егер ол <a href="${loginUrl}">кіруді орындаса</a>, тек өзіне ғана қолжетімді.`
}

function checkImpairedEye() {
    if (localStorage.getItem('impairedEye') == "true") {
        document.querySelector('body').classList.add('impairedEye')

        if (localStorage.getItem('fontSize') == null) document.querySelector('#set16pxFont').classList.add('selected')
        if (localStorage.getItem('fontSize') == "16") document.querySelector('#set16pxFont').classList.add('selected')
        if (localStorage.getItem('fontSize') == "18") document.querySelector('#set18pxFont').classList.add('selected')
        if (localStorage.getItem('fontSize') == "20") document.querySelector('#set20pxFont').classList.add('selected')
    } else {
        document.querySelector('body').classList.add('normal')

        document.querySelector('#set16pxFont').classList.remove('selected')
        document.querySelector('#set18pxFont').classList.remove('selected')
        document.querySelector('#set20pxFont').classList.remove('selected')
        document.querySelector('body').classList.remove('impairedEye')
        document.querySelector('body').classList.remove('fontSize16')
        document.querySelector('body').classList.remove('fontSize18')
        document.querySelector('body').classList.remove('fontSize20')
    }
}

function checkFontSize() {
    if (localStorage.getItem('fontSize') == null) {
        document.querySelector('body').classList.add('impairedEye')
        localStorage.setItem('fontSize', '16')
    }

    document.querySelector('body').classList.remove('fontSize16')
    document.querySelector('body').classList.remove('fontSize18')
    document.querySelector('body').classList.remove('fontSize20')
    document.querySelector('body').classList.add(`fontSize${localStorage.getItem('fontSize')}`)

    document.querySelector('#set16pxFont').classList.remove('selected')
    document.querySelector('#set18pxFont').classList.remove('selected')
    document.querySelector('#set20pxFont').classList.remove('selected')
    document.querySelector(`#set${localStorage.getItem('fontSize')}pxFont`).classList.add('selected')
}

document.addEventListener('DOMContentLoaded', () => {
    
    setInterval(adaptiveFavoritesLanguage, 500)

    checkFontSize()
    checkImpairedEye()

    document.getElementById('impairedIcon').addEventListener('click', () => {
        localStorage.getItem('impairedEye') == 'true' ? localStorage.removeItem('impairedEye') : localStorage.setItem('impairedEye', true)
        localStorage.getItem('impairedEye') == 'true' ? document.querySelector('body').classList.add('normal') : document.querySelector('body').classList.add('impairedEye')
        checkImpairedEye()
    })

    document.getElementById('impairedOut').addEventListener('click', () => {
        localStorage.removeItem('impairedEye')
        document.querySelector('body').classList.add('normal')
        checkImpairedEye()
    })

    document.getElementById('set16pxFont').addEventListener('click', () => {
        localStorage.setItem('fontSize', "16")
        checkFontSize()
    })
    document.getElementById('set18pxFont').addEventListener('click', () => {
        localStorage.setItem('fontSize', "18")
        checkFontSize()
    })
    document.getElementById('set20pxFont').addEventListener('click', () => {
        localStorage.setItem('fontSize', "20")
        checkFontSize()
    })
})