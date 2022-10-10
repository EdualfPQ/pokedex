class Service{
    async consultarPokemon(id){
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await axios.get(url)
        return response;
    }
}