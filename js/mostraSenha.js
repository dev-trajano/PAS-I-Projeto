function mostrarSenha(){
    var inputPass = document.getElementById('senhaInput')
    var btnShowPassword = document.getElementById('btn-senha')

    if(inputPass.type === 'password'){
        inputPass.type = 'text'

    } else {
        inputPass.type = 'password'
    }
}