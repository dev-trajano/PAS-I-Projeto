$(document).ready(function () {
  $("#myForm").submit(function (event) {
    event.preventDefault();

    // Verificar se todos os campos estão preenchidos
    var camposPreenchidos = true;
    $("#myForm input[required]").each(function () {
      if ($(this).val() === "") {
        camposPreenchidos = false;
        return false; // Para o loop caso um campo esteja vazio
      }
    });

    if (!camposPreenchidos) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    var nome = $("#nome").val();
    var email = $("#email").val();
    var dataNascimento = $("#dataNascimento").val();
    var cpf = $("#cpf").val();
    var telefone = $("#telefone").val();
    var cep = $("#cep").val();
    var rua = $("#rua").val();
    var bairro = $("#bairro").val();
    var cidade = $("#cidade").val();
    var estado = $("#estado").val();
    var complemento = $("#complemento").val();

    // Realize as validações aqui
    // Exemplo de validação de CPF:
    if (!validarCPF(cpf)) {
      alert("CPF inválido");
      return;
    }

    // Exemplo de validação de idade:
    var dataAtual = new Date();
    var dataLimite = new Date(
      dataAtual.getFullYear() - 16,
      dataAtual.getMonth(),
      dataAtual.getDate()
    );
    var dataNascimentoObj = new Date(dataNascimento);

    if (dataNascimentoObj > dataLimite) {
      alert("É necessário ter mais de 16 anos para preencher este formulário");
      return;
    }

    // Validar número de telefone
    if (!validarTelefone(telefone)) {
      alert("Número de telefone inválido");
      return;
    }

    // Exibir mensagem e redirecionar para outra página
    alert("Formulário enviado com sucesso!");
    window.location.href = "Api.html";
  });

  $("#cep").blur(function () {
    var cep = $(this).val().replace(/\D/g, "");

    if (cep != "") {
      var url = "https://viacep.com.br/ws/" + cep + "/json/";

      $.getJSON(url, function (data) {
        if (data.erro) {
          alert("CEP não encontrado");
        } else {
          $("#rua").val(data.logradouro);
          $("#bairro").val(data.bairro);
          $("#cidade").val(data.localidade);
          $("#estado").val(data.uf);
        }
      });
    }
  });

  // Função de validação de CPF
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf == "") return false;
    if (
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    )
      return false;

    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;

    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;

    return true;
  }

  // Função de validação de número de telefone
  function validarTelefone(telefone) {
    telefone = telefone.replace(/[^\d]+/g, "");
    if (telefone == "") return false;
    if (telefone.length < 10) return false; // Exemplo: 1234567890

    // Adicione outras regras de validação de telefone conforme necessário
    return true;
  }
});
