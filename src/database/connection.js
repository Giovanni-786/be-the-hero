const knex =  require('knex');
const configuration = require('../../knexfile')

//passando a conexão de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;