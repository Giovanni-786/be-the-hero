const cryptyo = require('crypto');
const connection = require('../database/connection');

module.exports = {
    //listando os dados de todas as ongs criadas
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    //criando dados na tabela ONGS.
    async create(request, response){
    const {name, email, whatsapp, city, uf} = request.body;

    //gerando ID's
    const id = cryptyo.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

     return response.json({ id });
   
    }
}