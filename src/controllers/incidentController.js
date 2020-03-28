const connection = require('../database/connection')

module.exports = {
    async index(request, response){

        //Fazendo a paginação, puxando apenas 5 casos por vez
        const{ page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        //Trazendo os dados da ong relacionado com aquele incidente, whatsapp, email etc
        //Relacionar dados de duas tabelas
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1)* 5)
        //selecionando os dados que quero para não sobrepor o ID
        .select([
        'incidents.*', 
        'ongs.name',
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city',
        'ongs.uf']);

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)

    },
    
    async create(request, response){
        const {title, description, value} = request.body;
        //acessando o id da nossa ONG.
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response){

        //preciso verificar se meu incidente que está querendo ser deletado, realmente foi criado pela ONG que está querendo deletar ele
        //Precisamos vetar essa situação pois, a ong pode deletar o incidente de outra ong
        const{ id } = request.params;
        const ong_id = request.headers.authorization; 

        //buscando meu id na tabela incidents
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permited'});

        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
};