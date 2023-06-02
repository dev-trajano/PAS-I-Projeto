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
