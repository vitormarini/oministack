const connection = require('../database/connection');

module.exports={
  async index(request, respose){
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents').where('ong_id',ong_id).select('*');
    
    if ( incidents != null ){
      return respose.json(incidents);
    }else{
      return Response.status(401).json({ error: 'Erro!' });
    }
    
  }
};