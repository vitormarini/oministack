const connection = require('../database/connection');

module.exports={
  async index(request, respose){
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*', 
      'ongs.nome',
      'ongs.cidade',
      'ongs.cidade',
      'ongs.uf'
    ]);

    respose.header('X-Total-Count', count['count(*)']);
    return respose.json(incidents);
  },

  async create(request, respose){
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return respose.json({ id });
  },

  async delete(request, respose){
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
    .where('id',id)
    .select('ong_id')
    .first();

    if ( incident.ong_id != ong_id ){
      return respose.status(401).json({ error: 'Operation not permited.' });
    }

    await connection('incidents').where('id',id).delete();

    return respose.status(204).send(); // Reposta para o front sem conteúdo
  }
};