const express = require('express');
const cors = require('cors');
const routs   = require('./routes');

const app = express();

//Convertendo todo retorno dentro do back que seja convertido em Json
app.use(cors());// Caso for para produção
/**
 * app.use(cors(
 *  origin: 'localhost...'  
 *  ));
 */
app.use(express.json());
app.use(routs);

app.listen(3333);