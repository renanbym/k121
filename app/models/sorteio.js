const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

module.exports = () => {

    const schema = mongoose.Schema(
        {
            data: { type: String, required: Date }
            ,sorteio: [{
                nome: { type: String, required: true }
                ,email: { type: String, required: true }
                ,amigo: { type: String, required: true }
            }]
        }
    );

    return mongoose.model('Sorteio', schema);
}
