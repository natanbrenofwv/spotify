document.querySelector("input[type='submit']").addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.querySelector("input[name='email']").value;
    const senha = document.querySelector("input[name='senha']").value;

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && senha === storedPassword) {
        alert("Login realizado com sucesso!");
        // Redirecione para a página principal, se necessário
        window.location.href = "perfil.html"; // Ajuste conforme o nome do arquivo
    } else {
        alert("Email ou senha incorretos.");
    }
});
document.querySelector("input[type='submit']").addEventListener("click", function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os valores de email e senha
    const email = document.querySelector("input[name='email']").value;
    const senha = document.querySelector("input[name='senha']").value;

    // Recupera os valores armazenados no localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    // Validação simples para autenticação
    if (email === storedEmail && senha === storedPassword) {
        alert("Login realizado com sucesso!");
        window.location.href = "home.html"; // Redireciona para a página home.html
    } else {
        alert("Email ou senha incorretos. Tente novamente.");
    }
});