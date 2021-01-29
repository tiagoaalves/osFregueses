const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;


//CODIGO SQL
const GET_ALL_USERS = 'SELECT imagem, id_utilizador, nome, email, idade, sexo, morada, condicaoQuota FROM utilizador';
const GET_ALL_USERS_SQL = 'SELECT imagem, id_utilizador, nome, email, idade, sexo, morada FROM utilizador WHERE cargo=?';
const GET_USER = 'SELECT imagem, id_utilizador, nome, email, idade, sexo, morada FROM utilizador WHERE email=?';
const GET_USER_SQL = 'SELECT id_utilizador, nome, email, idade, sexo, morada FROM utilizador WHERE id_utilizador=?';
//const CREATE_USER_SQL = 'INSERT INTO `utilizador` (id_utilizador, nome, idade, sexo, morada, cargo, password, email, associacao_id_associacao, quota_id_quota) VALUES (?,?,?,?,?,?,?,?,"1","1")';
const CREATE_USER_SQL = 'INSERT INTO users SET ?';
const CREATE_EVENTO = 'INSERT INTO eventos SET ?';
const UPDATE_USER_SQL = 'INSERT INTO utilizador SET nome=?, email=?, idade=?, sexo=?, morada=?, password=? WHERE id_utilizador=?';
const DELETE_USER_SQL = 'DELETE from utilizador WHERE id_utilizador=?';
const GET_EVENTOS = 'SELECT * FROM eventos';
const GET_INSCRITOS = 'SELECT membro FROM inscritos WHERE id_evento=?';
const GET_PRESENTES = 'SELECT membro FROM presentes WHERE id_evento=?';
const GET_EVENTO = 'SELECT id_evento, nome, data_evento, assistencia, descricao, texto FROM eventos WHERE id_evento=?';
const DELETE_EVENTO = 'DELETE from eventos WHERE id_evento=?';
const GET_PATROCINADORES = 'SELECT * FROM patrocinios';
const GET_PATROCINIO = 'SELECT id_patrocinio, nome, nif, tipo, doacao, descricao FROM patrocinios WHERE id_patrocinio=?';
const DELETE_PATROCINIO = 'DELETE from patrocinios WHERE id_patrocinio=?';


//ADMINISTARDORES

router.get('/utilizadores', function(req, res) {
  global.connection.query(GET_ALL_USERS, function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.get('/eventos', function(req, res) {
  global.connection.query(GET_EVENTOS, function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});


router.get('/associados', function(req, res) {
  global.connection.query(GET_ALL_USERS_SQL, ["Associado"], function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});


router.get('/admins', function(req, res) {
  global.connection.query(GET_ALL_USERS_SQL, ["Administrador"], function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.post('/admins', function(req, res) {
      console.log(req.body);
      console.log("routeadmins");
      const id_utilizador = req.body.id_utilizador;
      const nome = req.body.nome;
      const idade = req.body.idade;
      const sexo = req.body.sexo;
      const morada = req.body.morada;
      const password = req.body.password;
      const email = req.body.email;
      const cargo = req.body.cargo;
      console.log(req.body.cargo);
      console.log("without hahsh:" + req.headers.password);
      var query = "";
      bcrypt.hash(password, saltRounds).then(function (hash) {
      var post = {
      id_utilizador : id_utilizador,
      nome: nome,
      email: email,
      password: hash,
      idade : idade,
      sexo : sexo,
      morada : morada,
      cargo : cargo,
      };
      console.log("with hash:" + hash);
      query = global.connection.query('INSERT INTO utilizador SET ?', post, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "inserted with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });
});

});



//COLABORADORES

router.post('/presencas', function(req, res) {
      const id_evento = req.body.id_evento;
      const lista = req.body.lista;
      console.log(lista);
      var query = "";
      var post = {
      id_evento : id_evento,
      membro: 0,
      };
      var result = [];
      for(var i = 0; i<lista.length; i++){
        post.membro = lista[i];
        query = global.connection.query('INSERT INTO presentes SET ?', post, function (err, rows, fields) {
          if(err){
             result.push(1);
          }
      });
}
  if(result.length != 0){
  res.status(500).json({ error: "ERROR", response: null }); 
  }else{
    res.status(200).json({ error: null, response: "SUCCESS!!" });
  }
});


router.get('/colaboradores', function(req, res) {
  global.connection.query(GET_ALL_USERS_SQL, ["Colaborador"], function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.post('/colabs', function(req, res) {
      const id_utilizador = req.body.id_utilizador;
      const nome = req.body.nome;
      const idade = req.body.idade;
      const sexo = req.body.sexo;
      const morada = req.body.morada;
      const password = req.body.password;
      const email = req.body.email;
      console.log("without hahsh:" + req.headers.password);
      var query = "";
      bcrypt.hash(password, saltRounds).then(function (hash) {
      var post = {
      id_utilizador : id_utilizador,
      nome: nome,
      email: email,
      password: hash,
      idade : idade,
      sexo : sexo,
      morada : morada,
      cargo : 'Colaborador',
      };
      console.log("with hash:" + hash);
      query = global.connection.query('INSERT INTO utilizador SET ?', post, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "inserted with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });
});

});



//PATROCINADORES

router.get('/patrocinadores', function(req, res) {
  global.connection.query(GET_PATROCINADORES, function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.post('/patrocinadores', function(req, res) {
      const id_patrocinador = req.body.id_patrocinador;
      const nome = req.body.nome;
      const tipo = req.body.tipo;
      const doacao = req.body.doacao;
      const descricao = req.body.descricao;
      const nif = req.body.nif;
      var query = "";
      var post = {
      id_patrocinio : id_patrocinador,
      nome: nome,
      tipo: tipo,
      doacao : doacao,
      descricao : descricao,
      nif : nif,
      };
      query = global.connection.query('INSERT INTO patrocinios SET ?', post, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "inserted with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });
});


router.put('/patrocinador/:patrocinador', function(req, res) {
      const id_patrocinador = req.body.id_patrocinador;
      const nome = req.body.nome;
      const tipo = req.body.tipo;
      const doacao = req.body.doacao;
      const descricao = req.body.descricao;
      const nif = req.body.nif;
      var query = "";
      var update = {
      id_patrocinio : id_patrocinador,
      nome: nome,
      tipo: tipo,
      doacao : doacao,
      descricao : descricao,
      nif : nif,
      };
      query = global.connection.query(`UPDATE patrocinios SET id_patrocinio = '${id_patrocinador}', nif ='${nif}', tipo='${tipo}', nome='${nome}', doacao = '${doacao}', descricao='${descricao}' WHERE id_patrocinio=${id_patrocinador}`, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "Updated with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });
});

router.put('/pagar/:user', function(req, res) {
      const id_utilizador = req.body.id_utilizador;
      const condicaoQuota = req.body.condicaoQuota;
      var query = "";
      query = global.connection.query(`UPDATE utilizador SET condicaoQuota='${condicaoQuota}' WHERE id_utilizador=${id_utilizador}`, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "Updated with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });
});

router.delete('/patrocinador/:patrocinador', function(req, res) {
  console.log('chegou router');
  var query = global.connection.query(DELETE_PATROCINIO, [ req.params.patrocinador ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.affectedRows == 0) {
      res.status(404).json({ error: 'Patrocínio não encontrado!', response: null });    
    } else{
      res.status(204).json({ error: null, response: null }); 
    }
  });
});

router.get('/patrocinador/:patrocinador', function(req, res) {
  console.log(req.params);
  console.log(req.params.patrocinador);
  var query = global.connection.query(GET_PATROCINIO, [ req.params.patrocinador ], function(error, results, fields) {
    console.log(query.sql);
    console.log(res.results);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(404).json({ error: "NOT FOUND", response: null });      
    } else {
      res.status(200).json({ error: null, response: results[0] });
    }
  }); 
});


//EVENTOS

router.get('/evento/:evento', function(req, res) {
  console.log(req.params);
  var query = global.connection.query(GET_EVENTO, [ req.params.evento ], function(error, results, fields) {
    console.log(query.sql);
    console.log(res.results);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(404).json({ error: "NOT FOUND", response: null });      
    } else {
      res.status(200).json({ error: null, response: results[0] });
    }
  }); 
});

router.delete('/evento/:evento', function(req, res) {
  var resultados = [];
  var query = global.connection.query('DELETE from inscritos WHERE id_evento=?', [ req.params.evento ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      results.push(1);   
    }
  });
  var query = global.connection.query('DELETE from presentes WHERE id_evento=?', [ req.params.evento ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      results.push(1);   
    }
  });
  var query = global.connection.query(DELETE_EVENTO, [ req.params.evento ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      results.push(1);   
    }
  });
  if(resultados.length != 0){
  res.status(500).json({ error: "ERROR", response: null }); 
  }else{
    res.status(200).json({ error: null, response: "SUCCESS!!" });
  }
});

router.get('/inscritos/:evento', function(req, res) {
  var query = global.connection.query(GET_INSCRITOS, [ req.params.evento ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(404).json({ error: "NOT FOUND", response: null });      
    } else {
      res.status(200).json({ error: null, response: results });
    }
  }); 
});

router.get('/presentes/:evento', function(req, res) {
  var query = global.connection.query(GET_PRESENTES, [ req.params.evento ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(404).json({ error: "NOT FOUND", response: null });      
    } else {
      res.status(200).json({ error: null, response: results });
    }
  }); 
});

router.get('/presencas/:evento', function(req, res) {
  console.log(req.params);
  var query = global.connection.query('SELECT membro FROM presentes INNER JOIN eventos ON presentes.id_evento=eventos.id_evento WHERE presentes.id_evento =?', [ req.params.evento ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(404).json({ error: "NOT FOUND", response: null });      
    } else {
      console.log(results);
      res.status(200).json({ error: null, response: results });
    }
  }); 
});

router.get('/inscritos/inscritos/:evento', function(req, res) {
  console.log(req.params);
  var query = global.connection.query('SELECT membro FROM inscritos INNER JOIN eventos ON inscritos.id_evento=eventos.id_evento WHERE inscritos.id_evento =?', [ req.params.evento ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(404).json({ error: "NOT FOUND", response: null });      
    } else {
      console.log(results);
      res.status(200).json({ error: null, response: results });
    }
  }); 
});

router.post('/inscritos', function(req, res) {
      console.log(req.body);
      const nome = req.body.nome;
      const id_evento = req.body.id_evento;
      var query = "";
      var post = {
      membro : nome,
      id_evento: id_evento,
      };
      query = global.connection.query('INSERT INTO inscritos SET ?', post, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "inserted with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });

});

router.post('/eventos', function(req, res) {
      console.log(req.body);
      console.log("routeeventos");
      const id_evento = req.body.id_evento;
      const nome = req.body.nome;
      const data_evento = req.body.data_evento;
      const descricao = req.body.descricao;
      var query = "";
      var post = {
      id_evento : id_evento,
      nome: nome,
      data_evento : data_evento,
      descricao: descricao,
      };
      query = global.connection.query('INSERT INTO eventos SET ?', post, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "inserted with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });

});

router.put('/evento/:evento', function(req, res) {
      console.log('put evento');
      console.log(req);
      const id_evento = req.body.id;
      const nome = req.body.nome;
      const data_evento = req.body.data;
      const descricao = req.body.descricao;
      var query = "";
      var update = {
      id_evento,
      nome,
      data_evento,
      descricao,
      };
      query = global.connection.query(`UPDATE eventos SET nome = '${nome}', id_evento ='${id_evento}', data_evento='${data_evento}', descricao='${descricao}' WHERE id_evento=${id_evento}`, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "Updated with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });
});



//ASSOCIADOS


router.post('/associados', function(req, res) {
  console.log("routeassociados");
      const id_utilizador = req.body.id_utilizador;
      const nome = req.body.nome;
      const idade = req.body.idade;
      const sexo = req.body.sexo;
      const morada = req.body.morada;
      const password = req.body.password;
      const email = req.body.email;
      console.log("without hahsh:" + req.headers.password);
      var query = "";
      bcrypt.hash(password, saltRounds).then(function (hash) {
      var post = {
      id_utilizador : id_utilizador,
      nome: nome,
      email: email,
      password: hash,
      idade : idade,
      sexo : sexo,
      morada : morada,
      cargo : 'Associado',
      };
      console.log("with hash:" + hash);
      query = global.connection.query('INSERT INTO utilizador SET ?', post, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "inserted with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });
});

});


//GERAL

router.get('/user/:user', function(req, res) {
  console.log(req.params);
  global.connection.query(GET_USER_SQL, [ req.params.user ], function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(404).json({ error: "NOT FOUND", response: null });      
    } else {
      res.status(200).json({ error: null, response: results[0] });
    }
  }); 
});

router.put('/user/:user', function(req, res) {
      console.log(req.body);
      console.log("routeupdate");
      const id_utilizador = req.body.id_utilizador;
      const nome = req.body.nome;
      const idade = req.body.idade;
      const sexo = req.body.sexo;
      const morada = req.body.morada;
      const password = req.body.password;
      const email = req.body.email;
      const cargo = req.body.cargo;
      console.log("without hahsh:" + req.headers.password);
      var query = "";
      bcrypt.hash(password, saltRounds).then(function (hash) {
      var update = {
      nome,
      email,
      hash,
      idade,
      sexo,
      morada,
      cargo,
      id_utilizador,
      };
      console.log("with hash:" + hash);
      query = global.connection.query(`UPDATE utilizador SET nome = '${nome}', email ='${email}', password='${hash}', idade=${idade}, sexo='${sexo}', morada = '${morada}', cargo='${cargo}' WHERE id_utilizador=${id_utilizador}`, function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
      res.status(200).location(rows.insertId).send({
      "msg": "Updated with success"
      });
      console.log("Number of records inserted: " + rows.affectedRows);
      } else {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({"msg": err.code});
        console.log('Error while performing Query.', err);
        global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      } else {
      res.status(400).send({"msg": err.code});
      global.connection.query('error', function(err) {
              console.log("[mysql error]",err);
            });
      }
      }
    });
});
});

router.delete('/user/:user', function(req, res) {
  console.log('chegou router');
  var query = global.connection.query(DELETE_USER_SQL, [ req.params.user ], function(error, results, fields) {
    console.log(query.sql);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.affectedRows == 0) {
      res.status(404).json({ error: 'Utilizador não encontrado!', response: null });    
    } else{
      res.status(204).json({ error: null, response: null }); 
    }
  });
});

module.exports = router;