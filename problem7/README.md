# Problem 7

Make request from [The Star Wars API](https://swapi.dev/). Receive the character id. Return object with people name
and films the person was:

```js
const result = {
  name: "Luke Skywalker",
  films: ["A New Hope", "The Empire Strikes Back", "Return of the Jedi", "Revenge of the Sith"]
}
```

__Note1__: use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

__Note2__: don't forget about handling errors. Even if response was invalid (400's, 500's responses). For it just return

```js
return Promise.reject(new Error("smth went wrong"));
```

```js
fetchCharacterWithMovies(1)
// {
//   name: "Luke Skywalker",
//   films: ["A New Hope", "The Empire Strikes Back", "Return of the Jedi", "Revenge of the Sith"]
// }

fetchCharacterWithMovies(150)
// Error: smth went wrong
```