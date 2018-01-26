const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema.Types;

module.exports = () => {

    const schema = mongoose.Schema(
        {
            nome: { type: String, required: true }
            ,email:  { type: String, required: true}
        }
    );

    return mongoose.model('Participante', schema);
}
