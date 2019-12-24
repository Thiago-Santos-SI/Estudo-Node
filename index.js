//SINCRONIZANDO INFORMAÇÕES 

const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    // quando der algum problema, chamamos reject(ERRO)
    // quando sucess, resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function(){
            // return reject(new Error('ERROR DE VERDADE'))

            return resolve({
                id: 1,
                nome: 'thiago',
                data: new Date()
            })  
    }, 1000);

    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '34023804',
                ddd: '(11)'
            })
        }, 2000);
    })
    
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'adielson Assis alves',
            numero: 139
        })
        
    }, 2000);

}

//primero passo, add async _> automaticamente ela retorna uma Promise
main()
async function main(){
    try {
        console.time('medida')
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: ${telefone.ddd}${telefone.telefone},
            Endereço: ${endereco.rua},${endereco.numero}
        `)
        console.timeEnd('medida')

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

/*
const telefonePromise = obterTelefone()
telefonePromise.then(function (resultado1){
    console.log('resultado', resultado1)
}).catch(function(error) {
    console.error('error', error)
})
*/

/*
const usuarioPromise = obterUsuario()
// para manipular o sucesso usamos a função .then
// para manipular erros, usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario:{
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }  
            })
    })// P PROXIMO THEN TERÁ O RESULTADO DO ULTIMO QUE FOI MANIPULADO
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereço(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome},
            Telefone: ${resultado.telefone.ddd}${resultado.telefone.telefone},
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        `)

    }).catch(function(error){
        console.error('Error', error)
    })
*/

/*
obterUsuario(function resolverUsuario(error, usuario){
    if(error){
         console.error('Error en usuario', error)
         console.log('Error')
         return;
        
    }
    obterTelefone(usuario.id, function resolverTefefone(error1, telefone){
        if (error1) {
            console.log('Error')
            console.error('Error em telefone', error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error2) {
                console.error('Error em endereço', error)
                return;
    
            }
            
            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua},${endereco.numero},
                Tefeone: ${telefone.ddd},${telefone.telefone} 
            `)
        })
    })

})

*/
//const telefone = obterTelefone(usuario.id)


//console.log('telefone', telefone)