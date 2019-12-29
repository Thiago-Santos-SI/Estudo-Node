const service = require('./service')



Array.prototype.meuMap = function (callback) {
    const novoArray = []
    for (let index = 0; index <= this.length -1; index++) {
        const resultado = callback(this[index], index)
        novoArray.push(resultado)

    }
    return novoArray
}



async function main(){
    try {
        const results = await service.obterPessoas('a')
        const names = []

        results.results.forEach(element => {
            names.push(element.name)
        });

        const names2 =  results.results.map(function (params) {
            return params.name
        })

        const names3 = results.results.map((pessoas)=> pessoas.name)

        const names4 = results.results.meuMap(function (pessoa, index) {
            return `[${index}] ${pessoa.name}`
        });

        console.log('nomes:', names4);

    } catch (error) {
        console.error('error', error);

    }
}
main()