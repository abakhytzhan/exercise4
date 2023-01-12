async function fetchPokemon(name) {
  // Your code
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        return Promise.reject(new Error("smth went wrong"));
      } else {
        const pokemon = await response.json();
        return {
          id: pokemon.id,
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          image: pokemon?.sprites?.front_default,
        }
        
      }
    } catch(err) {
      return Promise.reject(new Error("smth went wrong"));
    }

}

module.exports = fetchPokemon;
