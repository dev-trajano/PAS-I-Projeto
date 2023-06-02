function validarCampos() {
  var campos = document.querySelectorAll(".validar");
  var preenchidos = true;

  campos.forEach(function (campo) {
    if (campo.value.trim() === "") {
      preenchidos = false;
      campo.classList.add("campo-invalido");
    } else {
      campo.classList.remove("campo-invalido");
    }
  });

  return preenchidos;
}

function validarSenhas() {
  var senha = document.getElementById("senhaInput").value;
  var repetirSenha = document.getElementById("repetirSenhaInput").value;

  if (senha !== repetirSenha) {
    alert("As senhas não coincidem. Por favor, verifique novamente.");
    return false;
  }

  return true;
}

function redirecionarParaApi(event) {
  event.preventDefault();

  if (validarCampos() && validarSenhas()) {
    var usuario = document.getElementById("usuarioInput").value;

    // Salva o valor do usuário em um cookie
    document.cookie = "usuario=" + encodeURIComponent(usuario);

    // Redireciona para a página "Api.html"
    window.location.href = "TelaApi.html";
  } else {
    alert("Por favor, preencha todos os campos corretamente.");
  }
}

document
  .querySelector(".formulario")
  .addEventListener("submit", redirecionarParaApi);
