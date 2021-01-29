var localUser;

function listaEventos() {
    fetch('/api/socios/')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
         criarEvento(data.response);
    });
  }

function criarEvento(data){
     var html = document.getElementById("evento").innerHTML;
    for(var i = data.length - 1; i>=0; i--){
    var o = data[i].id_evento;
    var name = data[i].nome;
    var date = data[i].data_evento;
    var descricao = data[i].descricao;
    html += '<div class="col-md-4 col-sm-6" style="color: white"  id="'+o+'"><div class="service" onclick="modalSocio('+o+')">'+name+'<h3 style="color: white"></h3>'+date+'</div>';
    if(comparaDatas(date)){
      html += '<button type="button" class="btn btn-primary" onclick="inscreve('+o+')">Inscrever-me</button></div>';
    }else{
      html += `<button type="button" class="btn btn-primary" onclick="presencas(${o},'${name}')">Marcar Presenças</button></div>`;
    }
    }
    document.getElementById("evento").innerHTML = html;
}

function presencas(evento, nome){
  fetch('/api/admins/utilizadores')
    .then(function(resp) {
        return resp.json();
    }).then(function(data){
      console.log(data);
    var html = `<h3>Presentes em ${nome}:</h3><ul><br>`;
    for(var i = 0; i<data.response.length; i++){
      var id = data.response[i].id_utilizador;
      html += `<div class="row">
              <li><input align="left" type="checkbox" id="${id}check" value="${data.response[i].nome}">${data.response[i].nome}</li><br>`;
    }
    html += '</div>';
    swal({
      html:html,
      preConfirm: () => {
            var lista = [];
            for(var i = 0; i<data.response.length; i++){
              var di = data.response[i].id_utilizador;
              if(document.getElementById(`${di}check`).checked == true){
                lista.push(document.getElementById(`${di}check`).value);
              }
            }
            marcarPresencas(lista, evento);
        }
    });
  });
}

function marcarPresencas(lista, evento){
  let url = "/api/admins/presencas";
    var data = {};
    data.lista = lista,
    data.id_evento =evento,
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servidor via POST
    fetch(url, {
      //headers: {"Content-Type": "application/x-www-form-urlencoded"},
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(data),
    }).then(function (response) {
    if (!response.ok) {
    console.log(response.status); //=> number 100–599
    console.log(response.statusText); //=> String
    console.log(response.headers); //=> Headers
    console.log(response.url); //=> String
    swal({title: 'Ocorreu em erro!', type:"error"});
    } else { //limpeza dos dados do form
    swal({title: "Presenças marcadas com sucesso!", type:"success"});
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
}

function onLoad(){
    listaEventos();
    userData();
}

function comparaDatas(time){
  var currentdate = new Date();
  var actual = new Date(time.substring(0,4), time.substring(5,7), time.substring(8,10));
  var gof = new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDay());
  console.log(actual);
  gof = new Date();
  if(actual.getTime() > gof.getTime()){
    return true;
  }else{
    return false;
  }
}

function showButton(i){
  if(comparaDatas(i)){
    
  }
}

function modalSocio(i){
    fetch(`/api/socios/${i}`)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        swal({
            title: data.response[0].nome,
            text: data.response[0].descricao,
            showCancelButton: true,
            confirmButtonText: 'Inscrever-me',
            preConfirm: () => {
            inscreve(i);
            }
        });
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
      console.log(json.id_utilizador);
      localUser = json;
    });
    }

function inscreve(i){
    let url = "/api/socios/";
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
    
    
  
  function validatorAssistencia(){
    if(document.getElementById("assistencia_evento").value.length<1){
      document.getElementById("assistenciaDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    document.getElementById("assistencia_evento").onkeyup = function see(){
    if(document.getElementById("assistencia_evento").value.length==0){
      document.getElementById("assistenciaDiv").innerHTML = '<h6>Este campo é obrigatório</h6>';
    }
    else{
      document.getElementById("assistenciaDiv").innerHTML = "";
    }
  };
  }
}