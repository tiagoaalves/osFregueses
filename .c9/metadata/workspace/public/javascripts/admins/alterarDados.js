{"changed":false,"filter":false,"title":"alterarDados.js","tooltip":"/public/javascripts/admins/alterarDados.js","value":"var localUser;\n\nfunction onLoad(){\n    userData();\n}\n\n function userData(){\n     console.log('userdata');\n      fetch(`/userDetails`, {\n      method: 'get',\n    }).then(function (response){\n      if (!response.ok) {\n        console.log(response);\n        console.log(response.status); //=> number 100–599\n        console.log(response.statusText); //=> String\n        console.log(response.headers); //=> Headers\n        console.log(response.url); //=> String\n      }else{\n        return response.json();\n      }\n    }).then(function(json){\n      localUser = json;\n      showUser();\n    });\n    }\n\nfunction showUser(){\n      document.getElementById(\"swal-input2\").value = localUser.nome;\n      document.getElementById(\"swal-input9\").value = localUser.email;\n      document.getElementById(\"swal-input3\").value = localUser.idade;\n      document.getElementById(\"swal-input5\").value = localUser.sexo;\n      document.getElementById(\"swal-input4\").value = localUser.morada;\n      console.log(localUser);\n    }\n\nfunction guardarDados(){\n    validatorConfirmPassword();\n    validatorEmail();\n    validatorIdade();\n    validatorNome();\n    validatorPassword();\n    validatorMorada();\n    var nome = document.getElementById(\"nome\").innerHTML;\n    var email = document.getElementById(\"emailovski\").innerHTML;\n    var idade = document.getElementById(\"idadediv\").innerHTML;\n    var morada = document.getElementById(\"morada\").innerHTML;\n    var password = document.getElementById(\"passworddiv\").innerHTML;\n    var confirmPassword = document.getElementById(\"confirmPassworddiv\").innerHTML;\n      if(nome == email){\n        if(email == idade){\n          if(idade == morada){\n            if(morada == password){\n              if(password == confirmPassword){\n                if(confirmPassword == \"\"){\n                  updateUser3(localUser.id_utilizador);\n                }else{\n                  alert(\"Erros no preenchimento do formulário!\");\n                }\n              }else{\n                alert(\"Erros no preenchimento do formulário!\");\n              }\n          }else{\n            alert(\"Erros no preenchimento do formulário!\");\n          }\n        }else{\n          alert(\"Erros no preenchimento do formulário!\");\n        }\n      }else{\n        alert(\"Erros no preenchimento do formulário!\");\n      }\n    }else{\n      alert(\"Erros no preenchimento do formulário!\");\n    }\n  }\n  \n  function updateUser3(user) {\n    console.log(\"chegou updateUser\");\n    let url = `/api/admins/user/${user}`;\n    var data = {};\n    data.id_utilizador = localUser.id_utilizador,\n    data.nome = document.getElementById(\"swal-input2\").value, \n    data.idade = document.getElementById(\"swal-input3\").value,\n    data.sexo = document.getElementById(\"swal-input5\").value,\n    data.morada = document.getElementById(\"swal-input4\").value,\n    data.password = document.getElementById(\"swal-input7\").value,\n    data.email = document.getElementById(\"swal-input9\").value,\n    data.cargo = localUser.cargo;\n    console.log(data); //debugging para ver os dados que foram enviados\n    //chamada fetch para envio dos dados para o servior via POST\n    fetch(url, {\n      //headers: {\"Content-Type\": \"application/x-www-form-urlencoded\"},\n      headers: {'Content-Type': 'application/json'},\n      method: 'PUT',\n      body: JSON.stringify(data)\n    }).then(function (response) {\n    if (!response.ok) {\n    console.log(response.status); //=> number 100–599\n    console.log(response.statusText); //=> String\n    console.log(response.headers); //=> Headers\n    console.log(response.url); //=> String\n    if (response.status === 409) {\n      swal({title:\"Conflito de dados de entrada!\", type: \"error\"});\n    } else {\n    swal({title: 'Ocorreu em erro!', type:\"error\"});\n    }\n    } else { //limpeza dos dados do form\n    swal({title: \"Dados alterados com sucesso!\", type:\"success\"});\n    }\n    }).then(function (result) {console.log(result);\n    }).catch(function (err) {alert(\"Submission error\"); console.error(err);\n    });\n    }\n  \n  function validator1(){\n    if(document.getElementById(\"swal-input1\").value.length<1){\n      document.getElementById(\"socio\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    document.getElementById(\"swal-input1\").onkeyup = function see(){\n    if(document.getElementById(\"swal-input1\").value.length==0){\n      document.getElementById(\"socio\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    else{\n      document.getElementById(\"socio\").innerHTML = \"\";\n    }\n  };\n  }\n  \n  function validatorNome(){\n    if(document.getElementById(\"swal-input2\").value.length<1){\n      document.getElementById(\"nome\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    document.getElementById(\"swal-input2\").onkeyup = function see(){\n    if(document.getElementById(\"swal-input2\").value.length==0){\n      document.getElementById(\"nome\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    else{\n      document.getElementById(\"nome\").innerHTML = \"\";\n    }\n  };\n  }\n  \n  function validatorEmail(){\n    if(document.getElementById(\"swal-input9\").value.length<1){\n      document.getElementById(\"emailovski\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    document.getElementById(\"swal-input9\").onkeyup = function see(){\n    if(document.getElementById(\"swal-input9\").value.length==0){\n      document.getElementById(\"emailovski\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    else{\n      document.getElementById(\"emailovski\").innerHTML = \"\";\n    }\n  };\n  }\n  \n  function validatorIdade(){\n    if(document.getElementById(\"swal-input3\").value.length<1){\n      document.getElementById(\"idadediv\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    document.getElementById(\"swal-input3\").onkeyup = function see(){\n    if(document.getElementById(\"swal-input3\").value.length==0){\n      document.getElementById(\"idadediv\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    else{\n      document.getElementById(\"idadediv\").innerHTML = \"\";\n    }\n  };\n  }\n  \n  function validatorMorada(){\n    if(document.getElementById(\"swal-input4\").value.length<1){\n      document.getElementById(\"morada\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    document.getElementById(\"swal-input4\").onkeyup = function see(){\n    if(document.getElementById(\"swal-input4\").value.length==0){\n      document.getElementById(\"morada\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    else{\n      document.getElementById(\"morada\").innerHTML = \"\";\n    }\n  };\n  }\n  \n  function validatorPassword(){\n    if(document.getElementById(\"swal-input7\").value.length==0){\n      document.getElementById(\"passworddiv\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    document.getElementById(\"swal-input7\").onkeyup = function see(){\n    if(document.getElementById(\"swal-input7\").value.length==0){\n      document.getElementById(\"passworddiv\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    else if(document.getElementById(\"swal-input7\").value.length < 6 && document.getElementById(\"swal-input7\").value.length >= 1){\n      document.getElementById(\"passworddiv\").innerHTML = '<h6>A password tem que conter 6 caracteres no mínimo!</h6>';\n    }\n    else{\n      document.getElementById(\"passworddiv\").innerHTML = \"\";\n    }\n    if(document.getElementById(\"swal-input7\").value == document.getElementById(\"swal-input8\").value){\n      document.getElementById(\"confirmPassworddiv\").innerHTML = \"\";\n    }\n    else{\n      document.getElementById(\"confirmPassworddiv\").innerHTML = '<h6>As passwords têm que coincidir!</h6>';\n    }\n  };\n  }\n  \n  function validatorConfirmPassword(){\n    if(document.getElementById(\"swal-input8\").value.length<1){\n      document.getElementById(\"confirmPassworddiv\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    document.getElementById(\"swal-input8\").onkeyup = function see2(){\n    if(document.getElementById(\"swal-input8\").value.length==0){\n      document.getElementById(\"confirmPassworddiv\").innerHTML = '<h6>Este campo é obrigatório</h6>';\n    }\n    else if(document.getElementById(\"swal-input7\").value !== document.getElementById(\"swal-input8\").value){\n      document.getElementById(\"confirmPassworddiv\").innerHTML = '<h6>As passwords têm que coincidir!</h6>';\n    }\n    else{\n      document.getElementById(\"confirmPassworddiv\").innerHTML = \"\";\n    }\n  };\n  }","undoManager":{"mark":-1,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":2857,"scrollleft":0,"selection":{"start":{"row":109,"column":75},"end":{"row":109,"column":75},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":203,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1547414271463}