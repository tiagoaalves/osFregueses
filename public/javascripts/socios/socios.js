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
    console.log(data[0]);
     var html = document.getElementById("evento").innerHTML;
    for(var i = data.length - 1; i>=0; i--){
    var o = data[i].id_evento;
    var name = data[i].nome;
    console.log(data[i].data_evento);
    var date = data[i].data_evento;
    html += '<div class="col-md-4 col-sm-6" style="color: white"  id="'+o+'"><div class="service" onclick="modalSocio('+o+')">'+name+'<h3 style="color: white"></h3>'+date+'</div>';
    if(comparaDatas(date)){
        html+=`<button type="button" class="btn btn-primary" onclick="inscreve(${o})">Inscrever-me</button></div>`;
        console.log('faz botao');
    }else{
        html+=`</div>`;
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

function onLoad(){
    listaEventos();
    userData();
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
            /*preConfirm: () => {
            inscreve(i);
            }*/
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
}