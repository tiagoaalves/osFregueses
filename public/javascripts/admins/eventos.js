var localUser;


function onLoad(){
      listEventos();
      userData();
  };
  


  
  function showModal(){
  swal({
  title: "Registar",
  html:
    '<input id="nome_evento" class="swal2-input" placeholder="Nome" onfocus="validatorNome()" >'+
    `<div id="nomeDiv"></div>`+
    '<input id="id_evento" class="swal2-input" placeholder="ID Evento" type="number" onfocus="validatorId()">'+
    `<div id="idDiv"></div>`+
    '<input id="data_evento" class="swal2-input" placeholder="Data" type="date" onfocus="validatorData()">'+
    `<div id="dataDiv"></div>`+
    '<input id="descricao_evento" class="swal2-input" placeholder="Descrição" onfocus="validatorDescricao()">'+
    `<div id="descricaoDiv"></div>`,      
  showCancelButton: true,
  confirmButtonText: "Adicionar Evento",
  cancelButtonText: "Cancelar",
  showLoaderOnConfirm: true,
  preConfirm: () => {
    saveEvento();
  }
  });
  }
  
  function modalInscricao(i){
    fetch(`/api/admins/evento/${i}`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        swal({
            title: data.response.nome,
            text: data.response.descricao,
            showCancelButton: true,
            confirmButtonText: 'Inscrever-me',
            preConfirm: () => {
            inscreve(i);
            }
        });
    });
}

function inscreve(i){
    let url = "/api/admins/inscritos";
    console.log(localUser);
    var data = {};
    data.nome = localUser.nome,
    data.id_evento =i,
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
      swal({title:"Já se tinha inscrito previamente!", type: "warning"});
    } else {
    swal({title: 'Ocorreu em erro!', type:"error"});
    }
    } else { //limpeza dos dados do form
    swal({title: "Inscrito no evento com sucesso!", type:"success"});
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
}
  
  function deleteUser(user, nome){
    swal({
      title: 'Aviso!',
      type: 'question',
      text: `Tem a certeza que pretende eliminar o evento ${nome}?`,
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      preConfirm: () => {
        deleteUser2(user);
      }
    });
  }
  
  function deleteUser2(evento){
    fetch(`/api/admins/evento/${evento}`, {
    method: 'delete',
    }).then(function (response) {
    if (!response.ok) {
    console.log(response.status); //=> number 100–599
    console.log(response.statusText); //=> String
    console.log(response.headers); //=> Headers
    console.log(response.url); //=> String
    swal({title: 'Ocorreu em erro!', type:"error"});
    } else { //limpeza dos dados do form
    swal({title: "Evento eliminado com sucesso!", type:"success"});
    listEventos();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
  }

  function saveEvento() {
    let url = "/api/admins/eventos";
    var data = {};
    data.id_evento = document.getElementById("id_evento").value,
    data.nome = document.getElementById("nome_evento").value, 
    data.data_evento = document.getElementById("data_evento").value,
    data.descricao = document.getElementById("descricao_evento").value,
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(url, {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function (response) {
    if (!response.ok) {
    console.log(response.status); //=> number 100–599
    console.log(response.statusText); //=> String
    console.log(response.headers); //=> Headers
    console.log(response.url); //=> String
    swal({title: 'Ocorreu em erro!', type:"error"});
    } else { //limpeza dos dados do form
    swal({title: "Evento registado com sucesso!", type:"success"}) 
    listEventos();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    };
    
    function criarEvento(data){
     var html = document.getElementById("evento").innerHTML;
    for(var i = data.length - 1; i>=0; i--){
    var o = data[i].id_evento;
    var date = data[i].data_evento;
    var name = data[i].nome;
    var descricao = data[i].descricao;
    html += `<div class="col-md-4 col-sm-6" style="color: white" id="${o}"><div class="service" onclick="showEvento(${o})" >${name}<h3 style="color: white"></h3>${date}</div>
    <button type="button" class="btn btn-danger" onclick='deleteUser(${o},"${name}")'>Eliminar</button>
    `;
    if(comparaDatas(date)){
        html+=`<button type="button" class="btn btn-warning" onclick='showInscritos(${o},"${name}")'>Incritos</button>
        <button type="button" class="btn btn-primary" onclick="inscreve(${o})">Inscrever-me</button></div>`;
        console.log('faz botao');
    }else{
        html+=`<button type="button" class="btn btn-warning" onclick='showPresencas(${o},"${name}")'>Presenças</button></div>`;
        console.log('nao faz botao');
    }
}
    document.getElementById("evento").innerHTML = html;
}

function comparaDatas(time){
  var currentdate = new Date();
  var actual = new Date(time.substring(0,4), time.substring(5,7), time.substring(8,10));
  var gof = new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDay());
  console.log(actual);
  console.log(gof);
  gof = new Date();
  if(actual.getTime() > gof.getTime()){
    return true;
  }else{
    return false;
  }
}

function showInscritos(evento, nome){
  var html = `<h3>Inscritos em ${nome}:</h3><ul>`;
  fetch(`/api/admins/inscritos/${evento}`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
        if(data.error == "NOT FOUND"){
          html += `<li>Não há utilizadores inscritos!</li>`;
        }else{
        for(var i = 0; i<data.response.length; i++){
          html += `<li>${data.response[i].membro}</li>`;
        }
        }
        html += '</ul>';
        console.log(html);
    })
    .then(function (){
      swal({
          html: html,
        });
    });
}

function showPresencas(evento, nome){
  var html = `<h3>Presentes em ${nome}:</h3><ul>`;
  fetch(`/api/admins/presentes/${evento}`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
        if(data.error == "NOT FOUND"){
          html += `<li>Não há utilizadores marcados como presentes!</li>`;
        }else{
        for(var i = 0; i<data.response.length; i++){
          html += `<li>${data.response[i].membro}</li>`;
        }
        }
        html += '</ul>';
        console.log(html);
    })
    .then(function (){
      swal({
          html: html,
        });
    });
}

function listEventos() {
    fetch('/api/admins/eventos')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        document.getElementById("evento").innerHTML = '';
        criarEvento(data.response);
    });
  }
  
  function userData(){
      fetch(`/userDetails`, {
      method: 'get',
    }).then(function (response){
      if (!response.ok) {
        console.log(response);
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
        console.log(response.url); //=> String
      }else{
        return response.json();
      }
    }).then(function(json){
      localUser = json;
    });
    }
    
    function showEvento(evento){
    fetch(`/api/admins/evento/${evento}`).then(function(resp){
      return resp.json();
    }).then(function(data){
      console.log(data);
      updateEvento1();
      document.getElementById("id_evento").value = data.response.id_evento;
      document.getElementById("nome_evento").value = data.response.nome;
      document.getElementById("data_evento").value = data.response.data_evento;
      document.getElementById("descricao_evento").value = data.response.descricao;
    });
    
  }
  
  function updateEvento1(data){
    
  swal({
  title: "Alterar Evento",
  html:
    '<input id="nome_evento" class="swal2-input" placeholder="Nome" onfocus="validatorNome()" >'+
    `<div id="nomeDiv"></div>`+
    '<input id="id_evento" class="swal2-input" placeholder="ID Evento" type="number" onfocus="validatorId()">'+
    `<div id="idDiv"></div>`+
    '<input id="data_evento" class="swal2-input" type="date" placeholder="Data" onfocus="validatorData()">'+
    `<div id="dataDiv"></div>`+
    '<input id="descricao_evento" class="swal2-input" placeholder="Descrição" onfocus="validatorDescricao()">'+
    `<div id="descricaoDiv"></div>`,
    //'<form id="formNewUser" name="formNewUser" action=""><input id="swal-input1" class="swal2-input" placeholder="Número de Sócio" type="number" data-rule="required"><input id="swal-input2" class="swal2-input" placeholder="Nome" data-rule="required|name"><input id="swal-input9" class="swal2-input" placeholder="Email" type="email" data-rule="required|email"><input id="swal-input3" class="swal2-input" placeholder="Idade" type="number" data-rule="required"><select id="swal-input5" class="swal2-input"><option value="" disabled selected>Sexo</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option></select><input id="swal-input4" class="swal2-input" placeholder="Morada" type="text" data-rule="required"><input id="swal-input7" class="swal2-input" placeholder="Password" type="password" data-rule="required|minlength-6"><input id="swal-input8" class="swal2-input" placeholder="Repita a Password" type="password" data-rule="required|password"></form>',
  showCancelButton: true,
  showConfirmButton: true,
  confirmButtonText: 'Alterar Dados',
  cancelButtonText: "Cancelar",
  showLoaderOnConfirm: true,
  allowOutsideClick: true,
  preConfirm: () => {
    updateEvento2();
  }
  
  });
  }
  
  function updateEvento3(evento) {
    let url = `/api/admins/evento/${evento}`;
    var data = {};
    data.id = document.getElementById("id_evento").value,
    data.nome = document.getElementById("nome_evento").value, 
    data.data = document.getElementById("data_evento").value,
    data.descricao = document.getElementById("descricao_evento").value,
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
    swal({title: "Evento alterado com sucesso!", type:"success"});
    listEventos();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    }
  
  //Validators
  
  function updateEvento2(){
    validatorNome();
    validatorId();
    validatorData();
    validatorDescricao();
    var nome = document.getElementById("nomeDiv").innerHTML;
    var id = document.getElementById("idDiv").innerHTML;
    var data = document.getElementById("dataDiv").innerHTML;
    var descricao = document.getElementById("descricaoDiv").innerHTML;
    if(nome == id){
      if(id == data){
        if(data == descricao){
          if(descricao == ''){
              updateEvento3(document.getElementById("id_evento").value);
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
    
  }
  
  
  function validatorNome(){
    if(document.getElementById("nome_evento").value.length<1){
      document.getElementById("nomeDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("nome_evento").onkeyup = function see(){
    if(document.getElementById("nome_evento").value.length==0){
      document.getElementById("nomeDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("nomeDiv").innerHTML = "";
    }
  };
  }
  
  function validatorId(){
    if(document.getElementById("id_evento").value.length<1){
      document.getElementById("idDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("id_evento").onkeyup = function see(){
    if(document.getElementById("id_evento").value.length==0){
      document.getElementById("idDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("idDiv").innerHTML = "";
    }
  };
  }
  
  function validatorData(){
    if(document.getElementById("data_evento").value.length<8){
      document.getElementById("dataDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("data_evento").onchange  = function see(){
    if(document.getElementById("data_evento").value.length<8){
      document.getElementById("dataDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("dataDiv").innerHTML = "";
    }
  };
  }
  
  function validatorDescricao(){
    if(document.getElementById("descricao_evento").value.length<1){
      document.getElementById("descricaoDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("descricao_evento").onkeyup = function see(){
    if(document.getElementById("descricao_evento").value.length==0){
      document.getElementById("descricaoDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("descricaoDiv").innerHTML = "";
    }
  };
  }
  
  