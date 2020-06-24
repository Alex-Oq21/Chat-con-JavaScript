const botones = document.querySelector('#botones')
const nombreUsuario = document.querySelector('#nombreUsuario')
const contenidoProtegido = document.querySelector('#contenidoProtegido')
const formulario = document.querySelector('#formulario')
const inputChat = document.querySelector('#inputChat')

firebase.auth().onAuthStateChanged(user => {

    if (user) {
        console.log(user)
        botones.innerHTML = /*html*/ `
        <button class="btn btn-outline-danger" id='btnCerrarSesion'>Cerrar Sesión</button>
        `
        nombreUsuario.innerHTML = user.displayName
        formulario.classList = 'input-group  py-3 fixed-bottom container'
        cerrarSesion()
        contenidoChat(user)
    } else {
        console.log('No existe usuaio')
        botones.innerHTML = /*html*/ `<button class="btn btn-outline-success mr-2" id='btnAcceder'>Acceder</button>`
        nombreUsuario.innerHTML = 'Chat'
        iniciarSesion()
        contenidoProtegido.innerHTML = /*html*/ `<p class="text-center lead mt-5">Debes Iniciar Sesión</p>`
        formulario.classList = 'input-group  py-3 fixed-bottom container d-none'
    }
})

const contenidoChat = (user) => {
    contenidoProtegido.innerHTML = /*html*/ `<p class="text-center lead mt-5">Bienvenido ${user.email}</p>`
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(inputChat.value)
        if (!inputChat.value.trim()) {
            console.log("input vacio")
            return
        }
        firebase.firestore().collection('chat').add({
                texto: inputChat.value,
                uid: user.uid,
                fecha: Date.now()
            })
            .then(res => { console.log('mensaje guardado') })
            .catch(e => console.log(e))
        inputChat.value = ''
    })
}

const cerrarSesion = () => {
    const btnCerrarSesion = document.querySelector('#btnCerrarSesion')
    btnCerrarSesion.addEventListener('click', () => {
        firebase.auth().signOut()
    })
}

const iniciarSesion = () => {
    const btnAcceder = document.querySelector('#btnAcceder')
    btnAcceder.addEventListener('click', async() => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            await firebase.auth().signInWithPopup(provider)
        } catch (error) {
            console.log(error)
        }
    })
}