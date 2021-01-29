var localUser;

function onload(){
    userData();
    //setTitle(localUser);
}

function setTitle(user){
    if(user.sexo == 'Masculino'){
    document.getElementById('greeting').innerHTML = `Bem vindo Sr. ${user.nome}`;
    }else{
        document.getElementById('greeting').innerHTML = `Bem vinda Srª. ${user.nome}`;
    }
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
        setTitle(localUser);
        quotaModal();
    });
    }
    
    function quotaModal(){
        if(localUser.condicaoQuota == 'Não'){
            swal({
                title: 'Ainda não pagou a Quota!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Pagar Quota',
            });
        }
    }
    
    function pagar(){
        let url = `/api/admins/pagar/${localUser.id_utilizador}`;
    var data = {};
    data.id_utilizador = localUser.id_utilizador;
    data.condicaoQuota = 'Sim';
    if(localUser.condicaoQuota == 'Sim'){
        swal({
            title:'Já tinha pago a cota anteriormente!',
            type: 'warning',
        });
    }else{
    fetch(url, {
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
    } else { 
    swal({title: "Quota paga!", type:"success"});
    userData();
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    }
    }
    
    function quotaModal(){
        if(localUser.condicaoQuota == 'Não'){
            swal({
                title: 'Ainda não pagou a Quota!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Pagar Quota',
                preConfirm: () => {
                    pagar();
                }
            });
        }
    }