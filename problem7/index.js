async function fetchCharacterWithMovies(characterId) {
  // Your code
  try {
    const response = await fetch(`https://swapi.dev/api/people/${characterId}`);
    if (!response.ok) {
      return Promise.reject(new Error("smth went wrong"));
    } else {
      const character = await response.json();
      const result = {
        name: character.name,
        films: await getFilms(character.films),
      }
 
    return Promise.resolve(result);
    }

  } catch (err) {
    return Promise.reject(new Error("smth went wrong"));
  }

  async function getFilms(arr) {
    return Promise.all(arr.map(url => fetch(url)
      .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error("smth went wrong"));
      }
      return response.json();
  })
    .then(film => film.title).catch(err => Promise.reject(new Error("smth went wrong"))
    )));
  }
}

module.exports = fetchCharacterWithMovies;
