const moment = require('moment')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const swig = require('swig')
const q = require('q')

moment.locale('pt-br')

const Email = {
    transporter: nodemailer.createTransport(
        smtpTransport({
            host: 'smtp-relay.sendinblue.com'
            ,port: 587
            ,auth: {
                user: 'no-reply@f2f-digital.com'
                ,pass: 'WOcwvULJj81zRqhb'
            }
        })
    )
}

Email.send = function( email_para, assunto,  body ){

    var deferred = q.defer()
    ,objThis =  this

    objThis.transporter.sendMail({
        from: 'no-reply@f2f-digital.com',
        to: email_para,
        subject: assunto,
        html: body
    }, function(error, response) {
        if (error) deferred.reject(error)
        else deferred.resolve( response )
    })

    return deferred.promise
}

Email.errorInSystem = function( error ){

    var deferred = q.defer()

    var tpl = swig.compileFile('./web/views/midia/emails/error.html')
    var tags = {
        header: 'assets/midia/images/header-email.png'
        ,error:  error
    }
    var html = tpl( tags )


    Email.send( 'no-reply@f2f-digital.com' , 'ERROR', html )
    .then(function(){
        return true
    })
    .catch(function(err){
        return false
    })

}


module.exports = Email
