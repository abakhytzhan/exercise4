# Problem 5

Make request from [PokeAPI](https://pokeapi.co/docs/v2). Receive the pokemon name. Return object with pokemon:

```js
const result = {
  id: 35,
  name: "clefairy",
  height: 6,
  weight: 75,
  // use from pokemon.sprites.front_default
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
}
```

__Note1__: use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

__Note2__: don't forget about handling errors. Even if response was invalid (400's, 500's responses). For it just return

```js
return Promise.reject(new Error("smth went wrong"));
```

```js
fetchPokemon("clefairy")
// {
//   id: 35,
//     name: "clefairy",
//   height: 6,
//   weight: 75,
//   // use from pokemon.sprites.front_default
//   image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
// }

fetchPokemon("no exist")
// Error: smth went wrong
```