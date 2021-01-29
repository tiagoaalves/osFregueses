var localUser;

function onLoad(){
    userData();
}

 function userData(){
     console.log('userdata');
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
      showUser();
    });
    }

function showUser(){
      document.getElementById("swal-input2").value = localUser.nome;
      document.getElementById("swal-input9").value = localUser.email;
      document.getElementById("swal-input3").value = localUser.idade;
      document.getElementById("swal-input5").value = localUser.sexo;
      document.getElementById("swal-input4").value = localUser.morada;
      console.log(localUser);
    }

function guardarDados(){
    validatorConfirmPassword();
    validatorEmail();
    validatorIdade();
    validatorNome();
    validatorPassword();
    validatorMorada();
    var nome = document.getElementById("nome").innerHTML;
    var email = document.getElementById("emailovski").innerHTML;
    var idade = document.getElementById("idadediv").innerHTML;
    var morada = document.getElementById("morada").innerHTML;
    var password = document.getElementById("passworddiv").innerHTML;
    var confirmPassword = document.getElementById("confirmPassworddiv").innerHTML;
      if(nome == email){
        if(email == idade){
          if(idade == morada){
            if(morada == password){
              if(password == confirmPassword){
                if(confirmPassword == ""){
                  updateUser3(localUser.id_utilizador);
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
  
  function updateUser3(user) {
    console.log("chegou updateUser");
    let url = `/api/admins/user/${user}`;
    var data = {};
    data.id_utilizador = localUser.id_utilizador,
    data.nome = document.getElementById("swal-input2").value, 
    data.idade = document.getElementById("swal-input3").value,
    data.sexo = document.getElementById("swal-input5").value,
    data.morada = document.getElementById("swal-input4").value,
    data.password = document.getElementById("swal-input7").value,
    data.email = document.getElementById("swal-input9").value,
    data.cargo = localUser.cargo;
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
    swal({title: "Dados alterados com sucesso!", type:"success"});
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
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