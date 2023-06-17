var eventRegisterButton = document.getElementById("eventRegister");
var btnLogin = document.getElementById("btn-login");
var inputLogin = document.getElementById("input-login");

//evento para o botão de login
if (btnLogin) {
  btnLogin.addEventListener("click", function() {
    var login = inputLogin.value;
    if (login == "") {
      alert("Please enter a name");
      return;
    } else {
      window.location.href = "index2.html";
      alert("Logged in: " + login);
    }
  });
}

//evento para o botão de registrar
if (eventRegisterButton) {
  var eventTriggered = false; // Variável de controle

  eventRegisterButton.addEventListener("click", function() {
    if (!eventTriggered) { // Verifica se o evento já foi acionado
      var div = document.createElement("div");

      var nameLabel = document.createElement("label");
      nameLabel.textContent = "Name: ";

      var nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = "Enter your name";

      var registerButton = document.createElement("button"); // Move the creation here
      registerButton.textContent = "Register";

      registerButton.addEventListener("click", function() {
        var name = nameInput.value;
        var contentDiv = document.getElementById("content");
        if (name == "") {
          alert("Please enter a name");
          return;
        } else{
          alert("Registered: " + name);
          contentDiv.removeChild(div);
          eventTriggered = false; // Define a variável de controle como false para permitir novas execuções
        }
      });

      var exitButton = document.createElement("button");
      exitButton.textContent = "Exit Registration";

      exitButton.addEventListener("click", function() {
        div.remove();
        eventTriggered = false; // Define a variável de controle como false para permitir novas execuções
      });

      div.appendChild(nameLabel);
      div.appendChild(nameInput);
      div.appendChild(registerButton);
      div.appendChild(exitButton);

      var contentDiv = document.getElementById("content");
      if (contentDiv) {
        contentDiv.appendChild(div);
      }

      eventTriggered = true; // Define a variável de controle como true para evitar novas execuções
    }
  });
}