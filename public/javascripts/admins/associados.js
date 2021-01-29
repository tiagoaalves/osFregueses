function listAssociados() {
    fetch('/api/admins/associados')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
      var table = $('#users-table').find('tbody')[0];
      table.innerHTML = "";
      $.each(data.response, function(index, value) {    
          var newRow = table.insertRow(table.rows.length);
          newRow.insertCell(0).appendChild(document.createTextNode(value.id_utilizador));     
          newRow.insertCell(1).appendChild(document.createTextNode(value.nome)); 
          newRow.insertCell(2).appendChild(document.createTextNode(value.email));
          newRow.insertCell(3).appendChild(document.createTextNode(value.idade));
          newRow.insertCell(4).appendChild(document.createTextNode(value.sexo));
          newRow.insertCell(5).appendChild(document.createTextNode(value.morada));
      });
    });
  }
  
  function showModal(){
  swal({
  title: "Registar Associado",
  html:
    '<form id="formNewUser" name="formNewUser" action="">'+
    '<input id="swal-input1" class="swal2-input" placeholder="Número de Sócio" type="number" onfocus="validator1()">'+
    '<div id="socio"></div>'+
    '<input id="swal-input2" class="swal2-input" placeholder="Nome" onfocus="validatorNome()">'+
    '<div id="nome"></div>'+
    '<input id="swal-input9" class="swal2-input" placeholder="Email" onfocus="validatorEmail()">'+
    '<div id="emailovski"></div>'+
    '<input id="swal-input3" class="swal2-input" placeholder="Idade" type="number" onfocus="validatorIdade()">'+
    '<div id="idadediv"></div>'+
    '<select id="swal-input5" class="swal2-input"><option value="" disabled selected>Sexo</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option></select>'+
    '<input id="swal-input4" class="swal2-input" placeholder="Morada" type="text" onfocus="validatorMorada()">'+
    '<div id="morada"></div>'+
    '<input id="swal-input7" class="swal2-input" placeholder="Password" type="password" onfocus="validatorPassword()">'+
    '<div id="passworddiv"></div>'+
    '<input id="swal-input8" class="swal2-input" placeholder="Repita a Password" type="password" onfocus="validatorConfirmPassword()">'+
    '<div id="confirmPassworddiv"></div>'+
    '</form>',
    //'<form id="formNewUser" name="formNewUser" action=""><input id="swal-input1" class="swal2-input" placeholder="Número de Sócio" type="number" data-rule="required"><input id="swal-input2" class="swal2-input" placeholder="Nome" data-rule="required|name"><input id="swal-input9" class="swal2-input" placeholder="Email" type="email" data-rule="required|email"><input id="swal-input3" class="swal2-input" placeholder="Idade" type="number" data-rule="required"><select id="swal-input5" class="swal2-input"><option value="" disabled selected>Sexo</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option></select><input id="swal-input4" class="swal2-input" placeholder="Morada" type="text" data-rule="required"><input id="swal-input7" class="swal2-input" placeholder="Password" type="password" data-rule="required|minlength-6"><input id="swal-input8" class="swal2-input" placeholder="Repita a Password" type="password" data-rule="required|password"></form>',
  showCancelButton: true,
  confirmButtonText: "Inscrever",
  cancelButtonText: "Cancelar",
  showLoaderOnConfirm: true,
  allowOutsideClick: false,
  preConfirm: () => {
    send();
    //saveUser();
    
  }
  
  });
  }
  
   function showUser(user){
    fetch(`/api/admins/user/${user}`).then(function(resp){
      return resp.json();
    }).then(function(data){
      updateUser();
      document.getElementById("swal-input1").value = data.response.id_utilizador;
      document.getElementById("swal-input2").value = data.response.nome;
      document.getElementById("swal-input9").value = data.response.email;
      document.getElementById("swal-input3").value = data.response.idade;
      document.getElementById("swal-input5").value = data.response.sexo;
      document.getElementById("swal-input4").value = data.response.morada;
    })
    
  }
  
  function updateUser(data){
    
  swal({
  title: "Alterar Associado",
  html:
    '<form id="formNewUser" name="formNewUser" action="">'+
    `<input id="swal-input1" class="swal2-input" placeholder="Número de Sócio" type="number" onfocus="validator1()">`+
    '<div id="socio"></div>'+
    '<input id="swal-input2" class="swal2-input" placeholder="Nome" onfocus="validatorNome()">'+
    '<div id="nome"></div>'+
    '<input id="swal-input9" class="swal2-input" placeholder="Email" onfocus="validatorEmail()">'+
    '<div id="emailovski"></div>'+
    '<input id="swal-input3" class="swal2-input" placeholder="Idade" type="number" onfocus="validatorIdade()">'+
    '<div id="idadediv"></div>'+
    '<select id="swal-input5" class="swal2-input"><option value="" disabled selected>Sexo</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option></select>'+
    '<input id="swal-input4" class="swal2-input" placeholder="Morada" type="text" onfocus="validatorMorada()">'+
    '<div id="morada"></div>'+
    '<input id="swal-input7" class="swal2-input" placeholder="Password" type="password" onfocus="validatorPassword()">'+
    '<div id="passworddiv"></div>'+
    '<input id="swal-input8" class="swal2-input" placeholder="Repita a Password" type="password" onfocus="validatorConfirmPassword()">'+
    '<div id="confirmPassworddiv"></div>'+
    '</form>',
    //'<form id="formNewUser" name="formNewUser" action=""><input id="swal-input1" class="swal2-input" placeholder="Número de Sócio" type="number" data-rule="required"><input id="swal-input2" class="swal2-input" placeholder="Nome" data-rule="required|name"><input id="swal-input9" class="swal2-input" placeholder="Email" type="email" data-rule="required|email"><input id="swal-input3" class="swal2-input" placeholder="Idade" type="number" data-rule="required"><select id="swal-input5" class="swal2-input"><option value="" disabled selected>Sexo</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option></select><input id="swal-input4" class="swal2-input" placeholder="Morada" type="text" data-rule="required"><input id="swal-input7" class="swal2-input" placeholder="Password" type="password" data-rule="required|minlength-6"><input id="swal-input8" class="swal2-input" placeholder="Repita a Password" type="password" data-rule="required|password"></form>',
  showCancelButton: true,
  showConfirmButton: true,
  confirmButtonText: 'Alterar Dados!',
  cancelButtonText: "Cancelar",
  showLoaderOnConfirm: true,
  allowOutsideClick: true,
  preConfirm: () => {
    sendUpdate();
    //saveUser();
    
  }
  
  });
  }
  
  function deleteUser(user, nome){
    swal({
      title: 'Aviso!',
      type: 'warning',
      text: `Está prestes a apagar o utilizador ${nome}! Tem a certeza?`,
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      preConfirm: () => {
        console.log(user);
        removeUser(user);
      }
    });
  }
  
  function removeUser(user){
    fetch(`/api/admins/user/${user}`, {
    method: 'delete',
    }).then(function (response) {
    if (!response.ok) {
    console.log(response.status); //=> number 100–599
    console.log(response.statusText); //=> String
    console.log(response.headers); //=> Headers
    console.log(response.url); //=> String
    swal({title: 'Ocorreu em erro!', type:"error"});
    } else { //limpeza dos dados do form
    swal({title: "Associado eliminado com sucesso!", type:"success"});
    listAssociados();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
  }
  
  function sendUpdate(){
    validator1();
    validatorConfirmPassword();
    validatorEmail();
    validatorIdade();
    validatorNome();
    validatorPassword();
    validatorMorada();
    var socio = document.getElementById("socio").innerHTML;
    var nome = document.getElementById("nome").innerHTML;
    var email = document.getElementById("emailovski").innerHTML;
    var idade = document.getElementById("idadediv").innerHTML;
    var morada = document.getElementById("morada").innerHTML;
    var password = document.getElementById("passworddiv").innerHTML;
    var confirmPassword = document.getElementById("confirmPassworddiv").innerHTML;
    //var key = {socio, nome, email, idade, morada, password, confirmPassword};
    //console.log(key);
    if(socio == nome){
      if(nome == email){
        if(email == idade){
          if(idade == morada){
            if(morada == password){
              if(password == confirmPassword){
                if(confirmPassword == ""){
                  update(document.getElementById("swal-input1").value);
                }else{
                  alert("Erros no preenchimento do formulário!");
                }
              }else{
                  alert("Erros no preenchimento do formulário!");
                }
          }else{
                  alert("Erros no preenchimento do formulário!");
                }
        }else{
                  alert("Erros no preenchimento do formulário!");
                }
      }else{
                  alert("Erros no preenchimento do formulário!");
                }
    }else{
                  alert("Erros no preenchimento do formulário!");
                }
  }else{
                  alert("Erros no preenchimento do formulário!");
                }
  }
  
  function validator1(){
    if(document.getElementById("swal-input1").value.length<1){
      document.getElementById("socio").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input1").onkeyup = function see(){
    if(document.getElementById("swal-input1").value.length==0){
      document.getElementById("socio").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("socio").innerHTML = "";
    }
  };
  }
  
  function send(){
    validator1();
    validatorConfirmPassword();
    validatorEmail();
    validatorIdade();
    validatorNome();
    validatorPassword();
    validatorMorada();
    var socio = document.getElementById("socio").innerHTML;
    var nome = document.getElementById("nome").innerHTML;
    var email = document.getElementById("emailovski").innerHTML;
    var idade = document.getElementById("idadediv").innerHTML;
    var morada = document.getElementById("morada").innerHTML;
    var password = document.getElementById("passworddiv").innerHTML;
    var confirmPassword = document.getElementById("confirmPassworddiv").innerHTML;
    //var key = {socio, nome, email, idade, morada, password, confirmPassword};
    //console.log(key);
    if(socio == nome){
      if(nome == email){
        if(email == idade){
          if(idade == morada){
            if(morada == password){
              if(password == confirmPassword){
                if(confirmPassword == ""){
                  saveUser();
                }else{
                  alert("Erros no preenchimento do formulário!");
                }
              }else{
                  alert("Erros no preenchimento do formulário!");
                }
          }else{
                  alert("Erros no preenchimento do formulário!");
                }
        }else{
                  alert("Erros no preenchimento do formulário!");
                }
      }else{
                  alert("Erros no preenchimento do formulário!");
                }
    }else{
                  alert("Erros no preenchimento do formulário!");
                }
  }else{
                  alert("Erros no preenchimento do formulário!");
                }
  }
  
  function validator1(){
    if(document.getElementById("swal-input1").value.length<1){
      document.getElementById("socio").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input1").onkeyup = function see(){
    if(document.getElementById("swal-input1").value.length==0){
      document.getElementById("socio").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("socio").innerHTML = "";
    }
  };
  }
  
  function validatorNome(){
    if(document.getElementById("swal-input2").value.length<1){
      document.getElementById("nome").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input2").onkeyup = function see(){
    if(document.getElementById("swal-input2").value.length==0){
      document.getElementById("nome").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("nome").innerHTML = "";
    }
  };
  }
  
  function validatorEmail(){
    if(document.getElementById("swal-input9").value.length<1){
      document.getElementById("emailovski").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input9").onkeyup = function see(){
    if(document.getElementById("swal-input9").value.length==0){
      document.getElementById("emailovski").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("emailovski").innerHTML = "";
    }
  };
  }
  
  function validatorIdade(){
    if(document.getElementById("swal-input3").value.length<1){
      document.getElementById("idadediv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input3").onkeyup = function see(){
    if(document.getElementById("swal-input3").value.length==0){
      document.getElementById("idadediv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("idadediv").innerHTML = "";
    }
  };
  }
  
  function validatorMorada(){
    if(document.getElementById("swal-input4").value.length<1){
      document.getElementById("morada").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input4").onkeyup = function see(){
    if(document.getElementById("swal-input4").value.length==0){
      document.getElementById("morada").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("morada").innerHTML = "";
    }
  };
  }
  
  function validatorPassword(){
    if(document.getElementById("swal-input7").value.length==0){
      document.getElementById("passworddiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input7").onkeyup = function see(){
    if(document.getElementById("swal-input7").value.length==0){
      document.getElementById("passworddiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else if(document.getElementById("swal-input7").value.length < 6 && document.getElementById("swal-input7").value.length >= 1){
      document.getElementById("passworddiv").innerHTML = '<h6>A password tem que conter 6 caracteres no mínimo!</h6>';
    }
    else{
      document.getElementById("passworddiv").innerHTML = "";
    }
    if(document.getElementById("swal-input7").value == document.getElementById("swal-input8").value){
      document.getElementById("confirmPassworddiv").innerHTML = "";
    }
    else{
      document.getElementById("confirmPassworddiv").innerHTML = '<h6>As passwords têm que coincidir!</h6>';
    }
  };
  }
  
  function validatorConfirmPassword(){
    if(document.getElementById("swal-input8").value.length<1){
      document.getElementById("confirmPassworddiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input8").onkeyup = function see2(){
    if(document.getElementById("swal-input8").value.length==0){
      document.getElementById("confirmPassworddiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else if(document.getElementById("swal-input7").value !== document.getElementById("swal-input8").value){
      document.getElementById("confirmPassworddiv").innerHTML = '<h6>As passwords têm que coincidir!</h6>';
    }
    else{
      document.getElementById("confirmPassworddiv").innerHTML = "";
    }
  };
  }
  
  function saveUser() {
    console.log(document.getElementById("swal-input1").value);
    let url = "/api/admins/associados";
    var data = {};
    data.id_utilizador = document.getElementById("swal-input1").value,
    data.nome = document.getElementById("swal-input2").value, 
    data.idade = document.getElementById("swal-input3").value,
    data.sexo = document.getElementById("swal-input5").value,
    data.morada = document.getElementById("swal-input4").value,
    data.password = document.getElementById("swal-input7").value,
    data.email = document.getElementById("swal-input9").value,
    data.cargo = 'Associado';
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(url, {
      //headers: {"Content-Type": "application/x-www-form-urlencoded"},
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function (response) {
    if (!response.ok) {
    console.log(response.status); //=> number 100–599
    console.log(response.statusText); //=> String
    console.log(response.headers); //=> Headers
    console.log(response.url); //=> String
    if (response.status === 409) {
      swal({title:"Conflito de dados de entrada!", type: "error"});
    } else {
    swal({title: 'Ocorreu em erro!', type:"error"});
    }
    } else { //limpeza dos dados do form
    swal({title: "Associado registado com sucesso!", type:"success"});
    listAssociados();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    }
  
    function onLoad(){
        listAssociados();
        var userId = '';
      $( '#users-table' ).delegate('tr td:nth-child(-n+6)', 'click', function() {
        if($(this).closest('table').find('thead tr th')[$(this).index()].outerText == 'Número de Sócio'){
          userId = $(this).text();
        }else{
        userId = $(this).siblings()[0].innerHTML;
        }
        showUser(userId);
      });
      $( '#users-table' ).delegate('tr:nth-child(n+1)', 'mouseenter', function() {
        if(($(this)[0].cells.length)==6){
        var x = $( this )[0].insertCell();
        x.innerHTML='<img src="/img/eliminar.png" height="25" width="25">';
        }
      });
      $( '#users-table' ).delegate('tr', 'mouseleave', function() {
        //if(($(this)[0].cells.length)==7){
        $( this )[0].deleteCell(6);
        //}
      });
      
      $( '#users-table' ).delegate('tr td:nth-child(7)', 'click', function() {
        deleteUser($(this).siblings()[0].innerHTML, $(this).siblings()[1].innerHTML);
      });
    };
    
        function update(user) {
    console.log("chegou updateUser");
    let url = `/api/admins/user/${user}`;
    var data = {};
    data.id_utilizador = document.getElementById("swal-input1").value,
    data.nome = document.getElementById("swal-input2").value, 
    data.idade = document.getElementById("swal-input3").value,
    data.sexo = document.getElementById("swal-input5").value,
    data.morada = document.getElementById("swal-input4").value,
    data.password = document.getElementById("swal-input7").value,
    data.email = document.getElementById("swal-input9").value,
    data.cargo = 'Associado';
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(url, {
      //headers: {"Content-Type": "application/x-www-form-urlencoded"},
      headers: {'Content-Type': 'application/json'},
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(function (response) {
    if (!response.ok) {
    console.log(response.status); //=> number 100–599
    console.log(response.statusText); //=> String
    console.log(response.headers); //=> Headers
    console.log(response.url); //=> String
    if (response.status === 409) {
      swal({title:"Conflito de dados de entrada!", type: "error"});
    } else {
    swal({title: 'Ocorreu em erro!', type:"error"});
    }
    } else { //limpeza dos dados do form
    swal({title: "Associado alterado com sucesso!", type:"success"});
    listAssociados();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    }