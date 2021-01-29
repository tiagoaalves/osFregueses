const express = require('express');
const router = express.Router();

const GET_ALL_EVENTOS_SQL = 'SELECT * FROM eventos';
const GET_EVENTO = 'SELECT * FROM eventos WHERE id_evento=?';
const CREATE_INSCRITO = 'INSERT INTO inscritos SET ?';

router.get('/', function(req, res) {
    var query = "";
  query = global.connection.query(GET_ALL_EVENTOS_SQL, function(error, results, fields) {
      console.log(query.sql);
      console.log(results.length);
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.get('/:evento', function(req, res) {
  global.connection.query(GET_EVENTO, [req.params.evento], function(error, results, fields) {
    if (error) {
      res.status(500).json({ error: error, response: null }); 
    } else if (results.length == 0) {
      res.status(204).json({ error: null, response: results });
    } else {
      res.status(200).json({ error: null, response: results });
    }
  });
});

router.post('/', function(req, res) {
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

module.exports = router;