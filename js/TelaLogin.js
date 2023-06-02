function salvarUsuario(event) {
  event.preventDefault();

  var usuarioInput = document.getElementById("usuarioInput");
  var senhaInput = document.getElementById("senhaInput");
  var usuario = usuarioInput.value;
  var senha = senhaInput.value;

  // Verifica se os campos estão preenchidos
  if (usuario.trim() === "" || senha.trim() === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  document.cookie = "usuario=" + encodeURIComponent(usuario);
  window.location.href = "TelaApi.html";
}

function mostrarSenha(){
  var inputPass = document.getElementById('senhaInput')
  var btnShowPassword = document.getElementById('btn-senha')

  if(inputPass.type === 'password'){
      inputPass.setAttribute('type', 'text')
      btnShowPassword.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')

  } else {
      inputPass.setAttribute('type', 'password')
      btnShowPassword.classList.replace('bi-eye-slash-fill','bi-eye-fill')
  }
}
