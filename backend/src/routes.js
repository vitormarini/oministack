const express             = require('express');
const OngController       = require('./controllers/OngController');
const IncidenteController = require('./controllers/IncidentController');
const ProfileController   = require('./controllers/ProfileController');
const SessionController   = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index); //SELECT
routes.post('/ongs', OngController.create); //CREATE

routes.get('/profile', ProfileController.index);//SELECT ALL INCIDENTS

routes.get('/incidents', IncidenteController.index); //SELECT
routes.post('/incidents', IncidenteController.create); //CREATE
routes.delete('/incidents/:id', IncidenteController.delete); //DELETE


module.exports = routes;