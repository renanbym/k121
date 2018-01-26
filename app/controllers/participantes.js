module.exports = (app) => {

    const participanteModel = app.models.participante;

    const participante = {

        get: (req, res) => {
            let query = participanteModel.find({});
            query.exec( (err, participantes) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                res.status(200).json({"code":200,"status":"success","data": participantes })
            });
        }

        ,save: (req, res) => {
            let query = new participanteModel(req.body);
            query.save( (err, participante) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                else res.status(200).json({"code":200,"status":"success","data": participante })
            })
        }

        ,delete: (req, res) => {
            participanteModel.remove({_id: req.body._id }, (err, participante) => {
                let msg_error = null;
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors });
                if( participante.n === 0 ) msg_error = "Campos inválidos";

                if( msg_error ) res.status(401).json({"code":401,"status":"error","message": msg_error });
                if(!msg_error && !err)  res.status(200).json({"code":200,"status":"success","data": participante })
            })
        }

    }

    return participante;

}
