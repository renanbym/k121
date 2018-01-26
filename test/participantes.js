process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

describe('Participantes ', () => {

    beforeEach( (done) => {
        let participanteModel =  mongoose.model('Participante');
        new participanteModel().remove({}, (error, participante) => {
            done();
        });
    });

    describe('/POST participante', (done) =>  {

        it('does not return the POST, because undefined fields', (done) => {

            let participante = {
                nome: 'Renan Mariano'
            }

            chai.request(server)
            .post('/api/participantes')
            .send(participante)
            .end( (err, res) => {
                res.should.have.status(401);
                res.body.status.should.be.equal('error');
                res.body.message.should.be.a('object');
                res.body.message.should.have.property('email');
                res.body.message.email.should.have.property('kind').eql('required');
                done();
            });

        });

        it('create participante', (done) => {

            let participante = {
                nome: 'Renan Mariano'
                ,email: 'renanbym@gmail.com'
            }

            chai.request(server)
            .post('/api/participantes')
            .send(participante)
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('nome');
                res.body.data.should.have.property('email');
                done()
            })
        })
    })

    describe('/GET participantes', (done) =>  {

        it('return the participantes', (done) => {
            chai.request(server)
            .get('/api/participantes')
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.an('array');
                done();
            });
        });

    });

    describe('/DELETE participantes', (done) =>  {

        it('delete participante id', (done) => {

            let data = {
                nome: 'Renan Mariano'
                ,email: 'renanbym@gmail.com'
            }

            let participanteModel =  mongoose.model('Participante');
            let participante = new participanteModel(data);
            participante.save( (err, res) => {

                chai.request(server)
                .delete('/api/participantes' )
                .send({ _id: res._id })
                .end( (err, response) => {
                    response.body.status.should.be.equal('success');
                    done()
                })
            })

        })

    });

});


describe('Sorteios ', () => {

    beforeEach( (done) => {
        let sorteioModel =  mongoose.model('Sorteio');
        new sorteioModel().remove({}, (error, sorteio) => {
            done();
        });
    });

    describe('/GET sorteios', (done) =>  {

        it('return the sorteios', (done) => {
            chai.request(server)
            .get('/api/sorteios')
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.equal('success');
                res.body.data.should.be.an('array');
                done();
            });
        });

    });

    describe('/POST sorteios', (done) =>  {


        describe('-', (done) =>  {

            before(function(){
                let participanteModel =  mongoose.model('Participante')
                participanteModel.find({}).exec( (err, participantes) => {
                    participantes.map( (current) => participanteModel.remove({_id: current._id }, (err, participante) => {}) )
                });
            })

            it('return the POST, if does not have enough participantes', (done) => {


                chai.request(server)
                .post('/api/sorteios')
                .send({})
                .end( (err, res) => {
                    res.should.have.status(401);
                    res.body.status.should.be.equal('error');
                    done()
                })

            })
        })

        describe('-', (done) =>  {

            before(function(){
                let participanteModel =  mongoose.model('Participante')

                let data = [{
                    nome: '#1'
                    ,email: 'renanbym@gmail.com'
                },{
                    nome: '#2'
                    ,email: 'renanbym@gmail.com'
                },{
                    nome: '#3'
                    ,email: 'renanbym@gmail.com'
                },{
                    nome: '#4'
                    ,email: 'renanbym@gmail.com'
                }]

                data.map( (current) => {  let p = new participanteModel(current); p.save( (err, res) => { current._id = res._id } ) })

            })

            it('create sorteio', (done) => {

                let participanteModel =  mongoose.model('Participante')

                chai.request(server)
                .post('/api/sorteios')
                .send({})
                .end( (err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.equal('success');
                    done()
                })
            })
        })
    })


});
