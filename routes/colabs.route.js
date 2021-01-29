const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;


const GET_ALL_USERS_SQL = 'SELECT imagem, id_utilizador, nome, email, idade, sexo, morada FROM utilizador WHERE cargo=?';
const GET_USER = 'SELECT imagem, id_utilizador, nome, email, idade, sexo, morada FROM utilizador WHERE email=?';
const GET_USER_SQL = 'SELECT id_utilizador, nome, email, idade, sexo, morada FROM utilizador WHERE id_utilizador=?';
//const CREATE_USER_SQL = 'INSERT INTO `utilizador` (id_utilizador, nome, idade, sexo, morada, cargo, password, email, associacao_id_associacao, quota_id_quota) VALUES (?,?,?,?,?,?,?,?,"1","1")';

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

router.get('/:user', function(req, res) {
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

module.exports = router;