var btnRooms = document.getElementById("cSala");
var btnEntrar = document.getElementById("priva-sala");
var btnEnter = document.getElementById("info2-btn");

//evento para o botão de entrar na sala
if(btnEnter){
    var eventTriggered = false; // Variável de controle
    btnEnter.addEventListener("click", function() {
        window.location.href = "index3.html";
    });
}

//entrar na sala privada
if(btnEntrar){
    var eventTriggered = false; // Variável de controle
    btnEntrar.addEventListener("click", function() {
        window.location.href = "index3.html";
    });
}

//evento para o botão de criar salas de chat
if (btnRooms) {
  var eventTriggered = false; // Variável de controle
  btnRooms.addEventListener("click", function() {
    if (!eventTriggered) { // Verifica se o evento já foi acionado
      var div = document.createElement("div");

      var tittleCreate = document.createElement("h1");
      tittleCreate.textContent = "Create a room";
      tittleCreate.classList.add("tittle-create");
    
      var roomName = document.createElement("input");
      roomName.type = "text";
      roomName.placeholder = "Add a room name";
      roomName.classList.add("room-name");
    
      roomLabel = document.createElement("label");
      roomLabel.textContent = "Room name: ";
      roomLabel.classList.add("room-label");
    
      var roomCheckBox = document.createElement("input");
      roomCheckBox.type = "checkbox";
      roomCheckBox.classList.add("room-checkbox");
      var roomCheckBoxLabel = document.createElement("label");
      roomCheckBoxLabel.classList.add("room-checkbox-label");
      roomCheckBoxLabel.textContent = "Private room:";

      var roomButton = document.createElement("button");
      roomButton.textContent = "Create room";
      roomButton.classList.add("room-button");

      var exitButton = document.createElement("button");
      exitButton.textContent = "Exit";
      exitButton.classList.add("room-exit-button");

      var salaPrivate = null; // Variável global para armazenar o campo de senha
      //evento do checkbox
      roomCheckBox.addEventListener("click", function() {
        if (roomCheckBox.checked) {
          roomName.disabled = false;
          if (!salaPrivate) { // Verifica se o campo de senha já foi adicionado
            salaPrivate = document.createElement("input");
            salaPrivate.type = "password";
            salaPrivate.placeholder = "Add a password";
            salaPrivate.classList.add("room-private");
          }
          if (this.parentNode) {
            this.parentNode.appendChild(salaPrivate);
          }
        } else {
          if (salaPrivate && salaPrivate.parentNode) { // Verifica se o campo de senha está presente e tem um pai válido
            salaPrivate.parentNode.removeChild(salaPrivate);
            salaPrivate = null; // Define a variável como null para permitir adicionar novamente no próximo clique
          }
        }
      });
      
      // Desabilita o campo de nome da sala e adiciona o parágrafo indicando que a sala é pública por padrão
      var salaPublic = document.createElement("p");
      salaPublic.textContent = "Room is public";
      if (roomCheckBox.parentNode) {
        roomCheckBox.parentNode.appendChild(salaPublic);
      }       

    //evento do botão de criar sala
      roomButton.addEventListener("click", function() {
        var room = roomName.value;
        var contentDiv = document.getElementById("content");
        if (room == "") {
          alert("Please enter a room name");
          return;
        } else {
          alert("Room created: " + room);
            contentDiv.removeChild(div);
            eventTriggered = false; // Define a variável de controle como false para permitir novas execuções
        }
      });

      exitButton.addEventListener("click", function() {
        div.remove();
        eventTriggered = false; // Define a variável de controle como false para permitir novas execuções
      });

      div.appendChild(tittleCreate);
      div.appendChild(roomLabel);
      div.appendChild(roomName);
      div.appendChild(roomCheckBoxLabel);
      div.appendChild(roomCheckBox);
      div.appendChild(roomButton);
      div.appendChild(exitButton);


      var contentDiv = document.getElementById("divCreate");
      if (contentDiv) {
        contentDiv.appendChild(div);
      }

      eventTriggered = true; // Define a variável de controle como true para evitar novas execuções
    }
  });
}