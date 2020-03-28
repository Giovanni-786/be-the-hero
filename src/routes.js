const express = require('express');

const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

//Criando sessão/Login
routes.post('/sessions', SessionController.create)


//listando minhas ongs cadastradas no BD.
routes.get('/ongs', OngController.index);
//Criando dados na minha tabela ongs.
routes.post('/ongs', OngController.create);

//Criando incidentes
routes.post('/incidents', IncidentController.create);

//Listando Incidentes
routes.get('/incidents', IncidentController.index);

routes.delete('/incidents/:id', IncidentController.delete)

//retornar casos específicos de uma única Ong.
routes.get('/profile', ProfileController.index)

module.exports = routes;

