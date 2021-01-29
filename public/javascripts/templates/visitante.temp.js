function onLoad(){
    console.log('onLoad');
    listaEventos();
}

function listaEventos() {
    console.log('listaEventos');
    fetch('/api/socios/')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
         criarEvento(data.response);
    });
  }

function criarEvento(data){
    console.log(data[0]);
     var html = document.getElementById("evento").innerHTML;
    for(var i = data.length - 1; i>=data.length - 6; i--){
        console.log('ciclo');
    var o = data[i].id_evento;
    var name = data[i].nome;
    var descricao = data[i].descricao;
    console.log(data[i].data_evento);
    var date = data[i].data_evento;
    html += `<div class="col-md-4 col-sm-6" style="color: white"  id="${o}"><div class="service" onclick="showModal('${name}', '${descricao}')">${name}<h3 style="color: white"></h3>${date}</div></div>`;
    
}
    document.getElementById("evento").innerHTML = html;
}

function showModal(nome, descricao){
    swal({
        title: nome,
        text: descricao,
    })
}