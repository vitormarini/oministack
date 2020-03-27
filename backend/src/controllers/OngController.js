//Importando a conexão com o banco de dados e criptografia
const crypto     = require('crypto');
const connection = require('../database/connection');


module.exports = {
  //FAZER O SELECT
  async index(request, response){
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },

  async create(request, response){
    //Recegebdi as variáveis
    const { nome, email, whatsapp, cidade, uf } = request.body;

    //Gerando uma criptografia para o ID
    const id = crypto.randomBytes(4).toString('HEX');

    //Fazendo a conexão com o banco de dados INSERT
    await connection('ongs').insert({
      id, 
      nome, 
      email,
      whatsapp,
      cidade,
      uf,
    });

    return response.json({ id });
  }
};