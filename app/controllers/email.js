const moment = require('moment')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const swig = require('swig')
const q = require('q')

moment.locale('pt-br')

const Email = {
    transporter: nodemailer.createTransport(
        smtpTransport({
            host: 'smtp.mailgun.org'
            ,port: 587
            ,auth: {
                user: 'postmaster@sandboxe827f46d56994e33a9b0ffee134a2c70.mailgun.org'
                ,pass: 'teste@digital'
            }
        })
    )
}

Email.send = function( email_para, assunto,  body ){

    var deferred = q.defer()
    ,objThis =  this

    objThis.transporter.sendMail({
        from: 'renanbym@gmail.com',
        to: email_para,
        subject: assunto,
        html: body
    }, function(error, response) {
        if (error) deferred.reject(error)
        else deferred.resolve( response )
    })

    return deferred.promise
}

Email.amigo = function( params ){

    var deferred = q.defer()

    var tpl = swig.compileFile('./web/views/emails/amigo.html')
    var tags = {
        amigo:  params.amigo
    }
    var html = tpl( tags )

    Email.send( params.dest , 'Amigo secreto k121' , html )
    .then(function(res){
        return true
    })
    .catch(function(err){
        return false
    })

}


module.exports = Email
