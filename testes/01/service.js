const {get} = require('axios')

const URL = `https://swapi.co/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const result = get(url)
    return result.data.results.map(mapearPessoas)
    
}

function mapearPessoas(item) {
    return{
        nome: item.name,
        peso: item.heigth
    }
}

module.exports = {
    obterPessoas
}