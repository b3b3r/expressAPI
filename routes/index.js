const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');
const connection = require('./conf');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/api/sport', (req, res) => {
  if (req.query.sports) {
    const sport = req.query.sports;
    connection.query(`SELECT * FROM sport WHERE sports LIKE "${sport}"`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  } else {
    connection.query('SELECT * FROM sport', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  }
});

router.get('/api/people', (req, res) => {
  if (req.query.age) {
    const { age } = req.query;
    connection.query(`SELECT * FROM sport WHERE age>${age}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  } else if (req.query.id) {
    const { id } = req.query;
    connection.query(`SELECT * FROM sport WHERE id=${id}`, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  } else {
    connection.query('SELECT firstname, age FROM sport ORDER BY age ASC', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'import de données');
      } else {
        res.json(results);
      }
    });
  }
});

router.post('/api/sport', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO sport SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de l\'ajout d\'un joueur');
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/api/people', (req, res) => {
  const idPeople = req.query.id;
  const { ispresent } = req.query;
  const formData = req.body;
  if (idPeople) {
    connection.query(`UPDATE sport SET ? WHERE id = ${idPeople}`, [formData, idPeople], (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la modification');
      } else {
        res.sendStatus(200);
      }
    });
  } else if (ispresent) {
    connection.query(`UPDATE sport SET ? WHERE ispresent = ${!ispresent}`, [formData, idPeople], (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la modification');
      } else {
        res.sendStatus(200);
      }
    });
  }
});

router.delete('/api/people', (req, res) => {
  const { id } = req.query;
  if (id) {
    connection.query(`DELETE FROM sport WHERE id=${id}`, [id], (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la suppression');
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    connection.query('DELETE FROM sport WHERE ispresent=0', [id], (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la suppression');
      } else {
        res.sendStatus(200);
      }
    });
  }
});

module.exports = router;
