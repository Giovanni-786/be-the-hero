const cors = require('cors');
const express = require('express');
const routes = require('./routes')

const app = express();
app.use(cors());
//informando express que estamos utilizando json para as requisições.
//Transformar meu json em algo entendível pela aplicação.
app.use(express.json());

app.use(routes);

//Teste

app.listen(3333);