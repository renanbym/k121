module.exports = (app) => {

    const participantes = app.controllers.participantes
    const sorteios = app.controllers.sorteios

    app.route('/api/participantes')
    .get( participantes.get )
    .post( participantes.save )
    .delete( participantes.delete )


    app.route('/api/sorteios')
    .get( sorteios.get )
    .post( sorteios.save )
    .delete( sorteios.deleteAll )


}
