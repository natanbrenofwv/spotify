
        document.getElementById("cadastro-form").addEventListener("submit", function(event) {
            event.preventDefault();
    
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const confirmaSenha = document.getElementById("confirma-senha").value;
    
            if (senha !== confirmaSenha) {
                alert("As senhas não coincidem. Tente novamente.");
                return;
            }
    
            // Salvar dados no localStorage
            localStorage.setItem("userName", nome);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", senha);
    
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html";
        });
  
    