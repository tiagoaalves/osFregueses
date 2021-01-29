/*function clearUserForm() {
  $('#user-form')[0].reset();     
}*/

function listPatrocinadores() {
    fetch('/api/admins/patrocinadores')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
      var table = $('#users-table').find('tbody')[0];
      table.innerHTML = "";
      $.each(data.response, function(index, value) {    
          var newRow = table.insertRow(table.rows.length);
          newRow.insertCell(0).appendChild(document.createTextNode(value.id_patrocinio));     
          newRow.insertCell(1).appendChild(document.createTextNode(value.nome)); 
          newRow.insertCell(2).appendChild(document.createTextNode(value.tipo));
          newRow.insertCell(3).appendChild(document.createTextNode(value.doacao));
          newRow.insertCell(4).appendChild(document.createTextNode(value.descricao));
          newRow.insertCell(5).appendChild(document.createTextNode(value.nif));
      });
    });
  }
  
  function showModal(){
  swal({
  title: "Registar Patrocinador",
  html:
    '<form id="formNewSponsor" name="formNewSponsor" action="">'+
    '<input id="swal-input1" class="swal2-input" placeholder="Número de Patrocinador" type="number" onfocus="validator1()">'+
    '<div id="patrocinador"></div>'+
    '<input id="swal-input2" class="swal2-input" placeholder="Nome" onfocus="validatorNome()">'+
    '<div id="nome"></div>'+
    '<input id="swal-input9" class="swal2-input" placeholder="Tipo" onfocus="validatorTipo()">'+
    '<div id="tipo"></div>'+
    '<input id="swal-input3" class="swal2-input" placeholder="Doação" type="number" onfocus="validatorDoacao()">'+
    '<div id="doacao"></div>'+
    '<input id="swal-input5" class="swal2-input" placeholder="Descrição" onfocus="validatorDescricao()">'+
    '<div id="descricao"></div>'+
    '<input id="swal-input4" class="swal2-input" placeholder="Nif" type="number" onfocus="validatorNif()">'+
    '<div id="nif"></div>'+
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
  
  function showPatrocinador(patrocinador){
    fetch(`/api/admins/patrocinador/${patrocinador}`).then(function(resp){
      return resp.json();
    }).then(function(data){
      updatePatrocinador();
      document.getElementById("swal-input1").value = data.response.id_patrocinio;
      document.getElementById("swal-input2").value = data.response.nome;
      document.getElementById("swal-input9").value = data.response.tipo;
      document.getElementById("swal-input3").value = data.response.doacao;
      document.getElementById("swal-input5").value = data.response.descricao;
      document.getElementById("swal-input4").value = data.response.nif;
    })
    
  }
  
    function updatePatrocinador(data){
    
  swal({
  title: "Registar Patrocinador",
  html:
    '<form id="formNewSponsor" name="formNewSponsor" action="">'+
    '<input id="swal-input1" class="swal2-input" placeholder="Número de Patrocinador" type="number" onfocus="validator1()">'+
    '<div id="patrocinador"></div>'+
    '<input id="swal-input2" class="swal2-input" placeholder="Nome" onfocus="validatorNome()">'+
    '<div id="nome"></div>'+
    '<input id="swal-input9" class="swal2-input" placeholder="Tipo" onfocus="validatorTipo()">'+
    '<div id="tipo"></div>'+
    '<input id="swal-input3" class="swal2-input" placeholder="Doação" onfocus="validatorDoacao()">'+
    '<div id="doacao"></div>'+
    '<input id="swal-input5" class="swal2-input" placeholder="Descrição" onfocus="validatorDescricao()">'+
    '<div id="descricao"></div>'+
    '<input id="swal-input4" class="swal2-input" placeholder="Nif" type="number" onfocus="validatorNif()">'+
    '<div id="nif"></div>'+
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
  
    function sendUpdate(){
    validator1();
    validatorDoacao();
    validatorTipo();
    validatorNome();
    validatorDescricao();
    validatorNif();
    var patrocinador = document.getElementById("patrocinador").innerHTML;
    var nome = document.getElementById("nome").innerHTML;
    var tipo = document.getElementById("tipo").innerHTML;
    var doacao = document.getElementById("doacao").innerHTML;
    var descricao = document.getElementById("descricao").innerHTML;
    var nif = document.getElementById("nif").innerHTML;
    //var key = {socio, nome, email, idade, morada, password, confirmPassword};
    //console.log(key);
    if(patrocinador == nome){
      if(nome == tipo){
        if(tipo == doacao){
          if(doacao == descricao){
            if(descricao == nif){
                if(nif == ""){
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
  }
  
  function validator1(){
    if(document.getElementById("swal-input1").value.length<1){
      document.getElementById("patrocinador").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input1").onkeyup = function see(){
    if(document.getElementById("swal-input1").value.length==0){
      document.getElementById("patrocinador").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("patrocinador").innerHTML = "";
    }
  };
  }
  
      function send(){
    validator1();
    validatorDoacao();
    validatorTipo();
    validatorNome();
    validatorDescricao();
    validatorNif();
    var patrocinador = document.getElementById("patrocinador").innerHTML;
    var nome = document.getElementById("nome").innerHTML;
    var tipo = document.getElementById("tipo").innerHTML;
    var doacao = document.getElementById("doacao").innerHTML;
    var descricao = document.getElementById("descricao").innerHTML;
    var nif = document.getElementById("nif").innerHTML;
    //var key = {socio, nome, email, idade, morada, password, confirmPassword};
    //console.log(key);
    if(patrocinador == nome){
      if(nome == tipo){
        if(tipo == doacao){
          if(doacao == descricao){
            if(descricao == nif){
                if(nif == ""){
                 savePatrocinador();
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
  
    function validatorTipo(){
    if(document.getElementById("swal-input9").value.length<1){
      document.getElementById("tipo").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input9").onkeyup = function see(){
    if(document.getElementById("swal-input9").value.length==0){
      document.getElementById("tipo").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("tipo").innerHTML = "";
    }
  };
  }
  
    function validatorDoacao(){
    if(document.getElementById("swal-input3").value.length<1){
      document.getElementById("doacao").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input3").onkeyup = function see(){
    if(document.getElementById("swal-input3").value.length==0){
      document.getElementById("doacao").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("doacao").innerHTML = "";
    }
  };
  }
  
    function validatorDescricao(){
    if(document.getElementById("swal-input5").value.length<1){
      document.getElementById("descricao").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input5").onkeyup = function see(){
    if(document.getElementById("swal-input5").value.length==0){
      document.getElementById("descricao").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("descricao").innerHTML = "";
    }
  };
  }
  
    function validatorNif(){
    if(document.getElementById("swal-input4").value.length<1){
      document.getElementById("nif").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("swal-input4").onkeyup = function see(){
    if(document.getElementById("swal-input4").value.length==0){
      document.getElementById("nif").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("nif").innerHTML = "";
    }
  };
  }
  
    function savePatrocinador() {
    console.log("chegou savepatrocinador");
    console.log(document.getElementById("swal-input1").value);
    let url = "/api/admins/patrocinadores";
    var data = {};
    data.id_patrocinador = document.getElementById("swal-input1").value,
    data.nome = document.getElementById("swal-input2").value, 
    data.tipo = document.getElementById("swal-input9").value,
    data.doacao = document.getElementById("swal-input3").value,
    data.descricao = document.getElementById("swal-input5").value,
    data.nif = document.getElementById("swal-input4").value,
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
    swal({title: "Patrocinador registado com sucesso!", type:"success"});
    listPatrocinadores();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    }
    
    
   function update(patrocinador) {
    console.log("chegou updatepatrocinador");
    console.log(document.getElementById("swal-input1").value);
    let url = `/api/admins/patrocinador/${patrocinador}`;
    var data = {};
    data.id_patrocinador = document.getElementById("swal-input1").value,
    data.nome = document.getElementById("swal-input2").value, 
    data.tipo = document.getElementById("swal-input9").value,
    data.doacao = document.getElementById("swal-input3").value,
    data.descricao = document.getElementById("swal-input5").value,
    data.nif = document.getElementById("swal-input4").value,
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(url, {
      //headers: {"Content-Type": "application/x-www-form-urlencoded"},
      headers: {'Content-Type': 'application/json'},
      method: 'put',
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
    swal({title: "Patrocinador alterado com sucesso!", type:"success"});
    listPatrocinadores();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    }
    
  

  function onLoad(){
      listPatrocinadores();
       var userId = '';
      $( '#users-table' ).delegate('tr td:nth-child(-n+6)', 'click', function() {
        if($(this).closest('table').find('thead tr th')[$(this).index()].outerText == 'ID Patrocinio'){
          userId = $(this).text();
        }else{
        userId = $(this).siblings()[0].innerHTML;
        }
        showPatrocinador(userId);
      });
      $( '#users-table' ).delegate('tr', 'mouseenter', function() {
        console.log($(this)[0].cells.length);
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
        deletePatrocinio($(this).siblings()[0].innerHTML, $(this).siblings()[1].innerHTML);
      });
  }
  
  function deletePatrocinio(patrocinador, nome){
    swal({
      title: 'Aviso!',
      type: 'warning',
      text: `Está prestes a apagar o utilizador ${nome}! Tem a certeza?`,
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      preConfirm: () => {
        console.log(patrocinador);
        removePatrocinio(patrocinador);
      }
    });
  }
  
  function removePatrocinio(patrocinador){
    fetch(`/api/admins/patrocinador/${patrocinador}`, {
    method: 'delete',
    }).then(function (response) {
    if (!response.ok) {
    console.log(response.status); //=> number 100–599
    console.log(response.statusText); //=> String
    console.log(response.headers); //=> Headers
    console.log(response.url); //=> String
    swal({title: 'Ocorreu em erro!', type:"error"});
    } else { //limpeza dos dados do form
    swal({title: "Patrocinio eliminado com sucesso!", type:"success"});
    listPatrocinadores();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
  }
  
  