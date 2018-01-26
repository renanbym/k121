const nomes = ['renan', 'bruna']

let shuffle = fisherYates( nomes )

console.log('Amigos  ', nomes)
console.log('Sorteado', shuffle )

function fisherYates( arr ){
    let k, t, len

    let deuBom = true

    participantes = [].concat(arr)
    len = participantes.length

    if( len < 2 ){
        console.log("Amigo secreto de 1 não rola")
        return
    }

    while( len ){
        k = Math.floor(Math.random() * len--)
        t = participantes[k]
        while (k < len) participantes[k] = participantes[++k]
        participantes[k] = t
    }

    for (let i = arr.length; i--;) if ( arr[i] === participantes[i]) deuBom = false

    if ( deuBom ){
        return participantes
    }else{
        return fisherYates( arr )
    }
}
