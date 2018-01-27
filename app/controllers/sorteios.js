const moment = require('moment')
const email = require('./email')

module.exports = (app) => {

    const sorteioModel = app.models.sorteio
    const participanteModel = app.models.participante;

    const sorteio = {

        get: (req, res) => {
            let query = sorteioModel.find({}).sort({data:-1});
            query.exec( (err, sorteios) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                res.status(200).json({"code":200,"status":"success","data": sorteios })
            })
        }

        ,deleteAll: ( req, res ) => {
            sorteioModel.find({}).exec( (err, sorteios) => {
                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                sorteios.map( (current) => sorteioModel.remove({_id: current._id }, (err, sorteio) => {}) )
                res.status(200).json({"code":200,"status":"success","data": [] })
            });
        }

        ,fisherYates: ( arr ) => {
            let key, temp, len

            let deuBom = true

            participantes = [].concat(arr)
            len = participantes.length

            if( len < 2 ) throw new "Amigo secreto de 0 ou 1 não rola"

            while( len ){
                key = Math.floor(Math.random() * len--)
                temp = participantes[key]
                while (key < len) participantes[key] = participantes[++key]
                participantes[key] = temp
            }

            for (let i = arr.length; i--;) if ( arr[i] === participantes[i]) deuBom = false

            return deuBom ?  participantes : sorteio.fisherYates( arr )

        }

        ,save: (req, res) => {
            participanteModel.find({}).exec( (err, participantes) => {

                if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })

                let participantesIndex = participantes.map( (current) => { return current['id'] })
                try{

                    sorteadoIndex = sorteio.fisherYates( participantesIndex )
                    let sorteados = []

                    for (let i = participantesIndex.length; i--;){

                        let pessoa = participantes.filter( (c) => {  return c._id == participantesIndex[i] } )
                        let amigo = participantes.filter( (c) => {  return c._id == sorteadoIndex[i] } )

                        sorteados.push({
                            '_id': pessoa[0]['_id']
                            ,'nome': pessoa[0]['nome']
                            ,'email': pessoa[0]['email']
                            ,'_id_amigo': amigo[0]['_id']
                            ,'email_amigo': amigo[0]['email']
                            ,'amigo': amigo[0]['nome']
                        })

                        sorteados.map( (current) => { email.amigo({ dest: current.email , amigo: current.amigo }) })
                    }

                    sorteioModel({
                        data: moment().format('YYYY-MM-DD HH:mm:ss')
                        ,sorteio: sorteados
                    })
                    .save( (err, resSorteios) => {

                        if(err) res.status(401).json({"code":401,"status":"error","message": err.errors })
                        else res.status(200).json({"code":200,"status":"success","data": resSorteios })
                    })

                }catch( e ){
                    if( e ) res.status(401).json({"code":401,"status":"error","message": e })
                }

            })


        }

    }

    return sorteio

}
