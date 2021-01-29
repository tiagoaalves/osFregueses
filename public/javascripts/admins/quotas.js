function listPagamentos() {
    fetch('/api/admins/utilizadores')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);
      var table = $('#users-table').find('tbody')[0];
      table.innerHTML = "";
      $.each(data.response, function(index, value) {    
          var newRow = table.insertRow(table.rows.length);
          newRow.insertCell(0).appendChild(document.createTextNode(value.nome));     
          newRow.insertCell(1).appendChild(document.createTextNode(value.condicaoQuota));
      });
    });
  }
  
  function onLoad(){
      listPagamentos();
  };