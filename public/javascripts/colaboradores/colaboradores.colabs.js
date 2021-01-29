function listColaboradores() {
    console.log("lista colaboradores");
    fetch('/api/admins/colaboradores')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
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
  
  function onLoad(){
      listColaboradores();
  };