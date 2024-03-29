const { StatusCodes } = require('http-status-codes');
const axiosRequest = require('../utils/axiosInstance');
const { collectionsIDs } = require('../utils/constants');
const {
  getMoviesData,
  randomSort,
  convertCollectionResponse,
  checkCollectionPoster,
} = require('../utils/helpers');
const { NotFoundError } = require('../errors');

const getCollectionsData = async (ids, key, full) => {
  const requests = ids.flatMap((id) =>
    typeof id === 'number'
      ? axiosRequest.get(`/collection/${id}`)
      : id.map((el) => axiosRequest.get(`/movie/${el}`))
  );

  const response = await Promise.all(requests)
    .then((res1) => res1)
    .then((res2) =>
      Promise.all(
        res2.map((res) =>
          res.data.parts
            ? {
                id: res.data.id,
                collection: res.data.name,
                movies: res.data.parts.map((movie) => getMoviesData(movie)),
                img: {
                  posterImg: res.data.poster_path,
                  backdropImg: res.data.parts.map(
                    (movie) => movie.backdrop_path
                  ),
                },
              }
            : getMoviesData(res.data)
        )
      )
    );

  const { collections, movies, wallpapers, poster } = convertCollectionResponse(
    response,
    full
  );

  return {
    id: collections.map((collect) => collect.id),
    key,
    collections: collections.map((collect) => collect.collection),
    img: {
      posterImg: checkCollectionPoster(key, poster),
      backdropImg: randomSort(wallpapers).at(0),
    },
    backdropImg: randomSort(wallpapers).at(0),
    movies,
  };
};

const getAllCollections = async (req, res, next) => {
  const keys = collectionsIDs.flatMap((el) => Object.keys(el));

  const data = await Promise.all(
    keys.map((key) =>
      getCollectionsData(collectionsIDs.find((el) => el[key])[key], key)
    )
  );

  res.status(StatusCodes.OK).json({
    status: 'success',
    results: data.length,
    data,
  });
};

const getCollection = async (req, res, next) => {
  const { id } = req.params;

  if (!collectionsIDs.find((item) => item[id.replaceAll('-', '_')]))
    throw new NotFoundError(
      `This collection "${id.replaceAll('-', ' ')}" could not be found.`
    );

  const data = await getCollectionsData(
    collectionsIDs.find((el) => el[id])[id],
    id,
    true
  );

  res.status(StatusCodes.OK).json({
    status: 'success',
    results: data.movies.length,
    data,
  });
};

module.exports = { getAllCollections, getCollection };
