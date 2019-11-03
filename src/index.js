
const api = 'http://localhost:3000/pokemon';

document.addEventListener('DOMContentLoaded', () => {
  fetchPokemon();
})

//fetch
let fetchPokemon = function(){
  return fetch(api)
    .then(function(response) {
      return response.json();
    })
    .then(function(pokemons){
      iteratePokemon(pokemons);
      filterPokemon(pokemons)
      return flipPokemon(pokemons)
      
    }) 
} //end fetch

//iterate through
function iteratePokemon(pokemons) {
  pokemons.forEach(function(pokemon){
    return appendPokemon(pokemon)
  })
} //end iteration

//add pokemon onto the page
function appendPokemon(pokemon) {
  center = document.querySelector("center")
  center.style.display = "none"

  // attributes to build image
  let image = document.createElement("img")
  image.dataset.id = pokemon.id
  image.dataset.action = "flip"
  image.className = "toggle-sprite"
  image.src = pokemon.sprites.front 

  //div class to put image into
  let pokemonImageContainer = document.createElement("div")
  pokemonImageContainer.className = "pokemon-image"

  //create h1 tag to hold pokemon name
  let h1 = document.createElement("h1")
  h1.className = "center-text"
  h1.innerText = pokemon.name

  //create div frame
  let pokemonFrameContainer = document.createElement("div")
  pokemonFrameContainer.className = "pokemon-frame"

  //create div card
  let pokemonCardContainer = document.createElement("div")
  pokemonCardContainer.className = "pokemon-card"

  pokemonCardContainer.appendChild(pokemonFrameContainer)
  pokemonFrameContainer.appendChild(h1)
  h1.appendChild(pokemonImageContainer)
  pokemonImageContainer.appendChild(image)

  let pkc = document.getElementById("pokemon-container")
  pkc.appendChild(pokemonCardContainer)
} //append pokemon

let pokemonCardClass = document.getElementsByClassName("pokemon-card")

//filter pokemon
let filterPokemon = function(pokemons) {
  let searchBar = document.getElementById("pokemon-search-input")
  searchBar.addEventListener('input', function(e) {
    Array.from(pokemonCardClass).forEach(function(element) {
      element.remove()
    })
    
    let filteredPokemon = pokemons.filter(function(pokemon) {
      if (pokemon.name.includes(e.target.value)) {
        return pokemon
      } 
    })
    if (!filteredPokemon.length) {
      center.style.display = "block"
    }
    iteratePokemon(filteredPokemon)
  })
} //end filter pokemon


let flipPokemon = function(pokemons) {
  document.addEventListener('click', function(e) {
    if (e.target.className === "toggle-sprite") {
      let id = parseInt(e.target.dataset.id)
      let foundPokemon = pokemons.find(function(pokemon) {
        return pokemon.id === id
      })

    if (e.target.src === foundPokemon.sprites.front) {
      e.target.src = foundPokemon.sprites.back
    } else {
      e.target.src = foundPokemon.sprites.front
    }
    }
  })
} //end flipPokemon


// console.log(`my id is ${id}`)
// console.dir(e.target)


// //this one does not work
    // HTMLCollection.prototype.forEach = Array.prototype.forEach
    // pokemonCardClass.prototype.forEach(function(element){
    //   element.remove()
    // })

// if(!!filteredPokemon.length) {
    //   center.style.display = "block"
    // 


    