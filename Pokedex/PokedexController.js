//Instanciamos la clase para las peticiones a la API
const servicio = new Service();
var nextUrl = '';

function CargaPokemons(url){
    let arrayPokemons = servicio.consultarPokemons(url)
         .then((result)=>{
            console.log(result.data.next);
            nextUrl = result.data.next;
            let array = result.data.results.map((element) => servicio.consultarPokemonPorUrl(element.url))
            Promise.all(array).then((response) => {
                response.forEach(element => {
                    añadirPokemons(element.data)
                });
            })
         })
    return arrayPokemons;
}

function añadirPokemons(pokemon){
    console.log(pokemon)
    //Obtenemos el contenedor de la pokedex
    const contenedor = document.getElementById('contenedor');

    //Creamos un nuevo elemento tipo card
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-3');

    //Creamos el elemento img para la imagen del pokemon
    const a = document.createElement('a');
    const img = document.createElement('img');
    a.href = `PokemonDetails/PokemonDetailsView.html?id=${pokemon.id}`;
    img.classList.add('card-img-top', 'pokemonbg');
    img.src = pokemon.sprites.front_default;
    // img.addEventListener('click', function (e) {
    //     window.location.href = `PokemonDetailsView?id=${pokemon.id}`;
    // })
    a.appendChild(img);
    card.appendChild(a);

    //Creamos un apartado para la informacion del pokemon
    const info = document.createElement('div');
    info.classList.add('card-body');

    //Añadimos el numero de la posicion del pokemon en la pokedex
    const position = document.createElement('span');
    position.textContent = `N°.${pokemon.id}`
    info.appendChild(position);

    //Añadimos el nombre del pokemon
    const name = document.createElement('h2');
    name.textContent = PrimeraLetraMayus(pokemon.forms[0].name);
    info.appendChild(name);

    //Añadimos los tipos del pokemon
    const types = document.createElement('div');
    pokemon.types.forEach(element => {
        const type = document.createElement('span');
        type.classList.add('span-size', element.type.name);
        type.textContent = PrimeraLetraMayus(element.type.name);
        types.appendChild(type);
    });
    info.appendChild(types);
    card.appendChild(info);
    contenedor.appendChild(card);   
}

function PrimeraLetraMayus(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let elm =document.getElementById('section');
const spinner = document.getElementById('spinner');
let flag=true;
addEventListener('scroll', function(){
    if ((window.innerHeight + window.scrollY) >= elm.offsetHeight){
      if(flag){
        flag=false;
        spinner.style.display = 'block'
        setTimeout(() => {
          spinner.style.display = 'none';
          CargaPokemons(nextUrl)
        }, 3000);
      }
    }else{
      flag=true;
      
    }
});

CargaPokemons('https://pokeapi.co/api/v2/pokemon');