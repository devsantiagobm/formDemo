// IMPORTANTE: leer guía 'DOMContentLoaded'
const form = document.querySelector('#enviar-mail')
const submit = document.querySelector('#enviar')
const reset = document.querySelector('#resetBtn');
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')
let verificar = false;


eventos();
function eventos() {
    document.addEventListener('DOMContentLoaded', iniciarApp);
    form.addEventListener('submit', enviarFormulario)
    email.addEventListener('input', e => validarFormulario(e));
    asunto.addEventListener('input', e => validarFormulario(e));
    mensaje.addEventListener('input', e => validarFormulario(e));
    reset.addEventListener('click', resetInputs)
};

// funciones

function iniciarApp() {
    email.focus();
    submit.disabled = true;
}

function resetInputs(e) {
    // e.preventDefault()
    form.reset();
    let inputs = [email, mensaje, asunto];
    inputs.forEach(campo => {
        campo.style.borderColor = "transparent"
        campo.nextSibling.nextSibling.textContent = ""
    })
}

function validarFormulario(e, mensaje = "Este campo es requerido") {

    if (e.target.value.length === 0) {
        inputErroneo(e)
    } else {
        inputCorrecto(e);
    }

    if (e.target.type === "email") {
        const rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!rex.test(e.target.value)) {
            inputErroneo(e, "Escribe un email correcto")
        } else {
            inputCorrecto(e);
        }
    }

    desactivar();
}

function inputErroneo(e, mensaje = "Este campo es requerido") {
    e.target.style.borderColor = 'red'
    e.target.nextSibling.nextSibling.textContent = mensaje;
    e.target.classList.remove('verificar')
}

function inputCorrecto(e) {
    e.target.style.borderColor = 'green'
    e.target.nextSibling.nextSibling.textContent = ""
    e.target.classList.add('verificar')
}

function desactivar() {
    const verificarLista = document.querySelectorAll('.verificar')
    verificarLista.length === 3 ? verificar = true : verificar = false
    if (verificar) {
        submit.disabled = false;
        submit.classList.add('enviar--active');
    }
    else {
        submit.disabled = true;
        submit.classList.remove('enviar--active');
    }
}

function enviarFormulario(e) {
    e.preventDefault();
    if(e.submitter.getAttribute('id') === "enviar"){
        const spiner = document.querySelector('.spinner')
        spiner.classList.add('spinner--active');
    
        const enviado = document.createElement('p');
        enviado.textContent = "Email enviado"
        setTimeout(() => {
            spiner.children[0].style.display = "none";
        }, 2000);
        setTimeout(() => {
            spiner.appendChild(enviado);
        }, 2000);
    
        setTimeout(() => {
            spiner.classList.remove('spinner--active');
            enviado.remove();
            spiner.children[0].style.display = "block"
            resetInputs()
        }, 3000);
    }
}