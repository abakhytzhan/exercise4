async function fetchPokemons(names) {
  // Your code
  const urls = [];
  for (let i = 0; i < names.length; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${names[i]}/`;
    urls.push(url);
  }

  return Promise.all(urls.map(url => fetch(url)
  .then(response => {
    if (!response.ok) {
        return Promise.reject(new Error("smth went wrong"));
    }
    return response.json();
  })
  .then(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      image: pokemon?.sprites?.front_default,
    }
  }).catch(err => Promise.reject(new Error("smth went wrong"))
  )));
}

module.exports = fetchPokemons;
