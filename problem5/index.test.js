const { describe, expect, test, afterEach, jest } = require("@jest/globals");
const fetchPokemon = require("./index");

const api = "https://pokeapi.co/docs/v2";

const pokemon = {
  id: 35,
  name: "clefairy",
  base_experience: 113,
  height: 6,
  is_default: true,
  order: 56,
  weight: 75,
  location_area_encounters: "/api/v2/pokemon/35/encounters",
  sprites: {
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png",
    back_female: null,
    back_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/35.png",
    back_shiny_female: null,
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
    front_female: null,
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
    front_shiny_female: null,
  },
  stats: [
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "fairy",
        url: "https://pokeapi.co/api/v2/type/18/",
      },
    },
  ],
};

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("problem5", () => {
  test("fetch correct result", async () => {
    const expected = {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      image: pokemon.sprites.front_default,
    };

    const fetchMock = jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        ok: true,
        json: () => Promise.resolve(pokemon),
      })
    );

    await expect(fetchPokemon(pokemon.name)).resolves.toEqual(expected);
    expect(fetchMock).toHaveBeenLastCalledWith(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
  });

  test("fail pokemon result: 404", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 404,
        statusText: "Not Found",
        ok: false,
        json: () => Promise.resolve(pokemon),
      })
    );

    await expect(fetchPokemon(pokemon.name)).rejects.toThrow("smth went wrong");
  });
  
  test("fail pokemon result: rejects promise", async () => {
    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error("error")));

    await expect(fetchPokemon(pokemon.name)).rejects.toThrow("smth went wrong");
  });
});
