const { describe, expect, test, afterEach, jest } = require("@jest/globals");
const fetchCharacterWithMovies = require("./index");

const api = "https://swapi.dev/api";

const character = {
  name: "Darth Vader",
  films: [
    `${api}/films/1/`,
    `${api}/films/2/`,
    `${api}/films/3/`,
    `${api}/films/6/`,
  ],
};

const movies = [
  {
    title: "A New Hope",
  },
  {
    title: "The Empire Strikes Back",
  },
  {
    title: "Return of the Jedi",
  },
  {
    title: "Revenge of the Sith",
  },
];

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
  jest.useRealTimers();
});

describe("problem7", () => {
  test("fetch correct result", async () => {
    const expected = {
      name: character.name,
      films: character.films.map((_, i) => movies[i].title),
    };

    const characterId = 4;

    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          statusText: "OK",
          ok: true,
          json: () => Promise.resolve(character),
        })
      )
      .mockImplementation((url) =>
        Promise.resolve({
          status: 200,
          statusText: "OK",
          ok: true,
          json: () => {
            if (url.startsWith(`${api}/films/1`)) {
              return Promise.resolve(movies[0]);
            }

            if (url.startsWith(`${api}/films/2`)) {
              return Promise.resolve(movies[1]);
            }

            if (url.startsWith(`${api}/films/3`)) {
              return Promise.resolve(movies[2]);
            }

            if (url.startsWith(`${api}/films/6`)) {
              return Promise.resolve(movies[3]);
            }

            return Promise.resolve();
          },
        })
      );

    await expect(fetchCharacterWithMovies(characterId)).resolves.toEqual(
      expected
    );
    expect(fetchMock).toBeCalledTimes(1 + movies.length);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining(api));
  });

  test("fetch in parallel", async () => {
    jest.useFakeTimers();
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          statusText: "OK",
          ok: true,
          json: () => Promise.resolve(character),
        })
      )
      .mockImplementation((url) =>
        Promise.resolve({
          status: 200,
          statusText: "OK",
          ok: true,
          json: () => {
            if (url.startsWith(`${api}/films/1`)) {
              return Promise.resolve(movies[0]);
            }

            if (url.startsWith(`${api}/films/2`)) {
              return Promise.resolve(movies[1]);
            }

            if (url.startsWith(`${api}/films/3`)) {
              return Promise.resolve(movies[2]);
            }

            if (url.startsWith(`${api}/films/6`)) {
              return Promise.resolve(movies[3]);
            }

            return Promise.resolve();
          },
        })
      );

    expect(fetchMock).toBeCalledTimes(0);
    const resPromise = fetchCharacterWithMovies(4);
    expect(fetchMock).toBeCalledTimes(1);
    await resPromise;
    expect(fetchMock).toBeCalledTimes(1 + movies.length);
  });

  test("fail films result: 404", async () => {
    const characterId = 4;

    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          statusText: "OK",
          ok: true,
          json: () => Promise.resolve(character),
        })
      )
      .mockImplementation((url) =>
        Promise.resolve({
          status: 404,
          statusText: "Not Found",
          ok: false,
          json: () => {
            if (url.startsWith(`${api}/films/1`)) {
              return Promise.resolve(movies[0]);
            }

            if (url.startsWith(`${api}/films/2`)) {
              return Promise.resolve(movies[1]);
            }

            if (url.startsWith(`${api}/films/3`)) {
              return Promise.resolve(movies[2]);
            }

            if (url.startsWith(`${api}/films/6`)) {
              return Promise.resolve(movies[3]);
            }
          },
        })
      );

    await expect(fetchCharacterWithMovies(characterId)).rejects.toThrow(
      "smth went wrong"
    );
  });

  test("fail films result: rejects promise", async () => {
    const characterId = 4;

    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          statusText: "OK",
          ok: true,
          json: () => Promise.resolve(character),
        })
      )
      .mockImplementation((url) => Promise.reject(new Error("error")));

    await expect(fetchCharacterWithMovies(characterId)).rejects.toThrow(
      "smth went wrong"
    );
  });

  test("fail people result: 404", async () => {
    const characterId = 4;

    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 404,
        statusText: "Not Found",
        ok: false,
        json: () => Promise.resolve(character),
      })
    );

    await expect(fetchCharacterWithMovies(characterId)).rejects.toThrow(
      "smth went wrong"
    );
  });

  test("fail people result: rejects promise", async () => {
    const characterId = 4;

    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject(new Error("error")));

    await expect(fetchCharacterWithMovies(characterId)).rejects.toThrow(
      "smth went wrong"
    );
  });
});
