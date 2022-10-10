const urlService = 'https://pokeapi.co/api/v2/';

class Service{
    async consultarPokemons(url){
        //let url = `${urlService}pokemon?offset=${inicio}&limit=${cantidad}`;
        let response = await axios.get(url)
            // .then((result) => {
            //     return result.data.results;
            // })
            // .catch((error) => {
            //     return error;
            // });
        return response;
    }

    async consultarPokemonPorUrl(url){
        let response = await axios.get(url)
            // .then((response) => {
            //     return response;
            // })
            // .catch((error) => {
            //     return error;
            // });
        return response;
    }

    async consultarPokemonPorId(id){
        let url = `${urlService}pokemon/${id}`; 
        let response = await axios.get(url)
            // .then((response) => {
            //     return response.data;
            // })
            // .catch((error) => {
            //     return error;
            // });
        return response;
    }
}

// consultarPokemons(0,20)
//     .then((response) => {
//         let pokemon = response.results;
//         consultarPokemonPorUrl(pokemon[0].url)
//             .then((response) => {
//                 console.log(response)
//                 console.log('')
//                 let imagenes = response.sprites
//                 console.log(imagenes.front_default)
//             })
//             .catch((error) => {

//             });
//     })
//     .catch((error) => {

//     });