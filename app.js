const botones = document.querySelector('#botones')
const nombreUsuario = document.querySelector('#nombreUsuario')
const contenidoProtegido = document.querySelector('#contenidoProtegido')

firebase.auth().onAuthStateChanged(user => {

    if (user) {
        console.log(user)
        botones.innerHTML = /*html*/ `
        <button class="btn btn-outline-danger" id='btnCerrarSesion'>Cerrar Sesión</button>
        `
        nombreUsuario.innerHTML = user.displayName
        contenidoProtegido.innerHTML = `<p class="text-center lead mt-5">Bienvenido ${user.email}</p>`

        cerrarSesion()
    } else {
        console.log('No existe usuaio')
        botones.innerHTML = /*html*/ `<button class="btn btn-outline-success mr-2" id='btnAcceder'>Acceder</button>`
        nombreUsuario.innerHTML = 'Chat'
        iniciarSesion()
        contenidoProtegido.innerHTML = `<p class="text-center lead mt-5">Debes Iniciar Sesión</p>`
    }
})

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