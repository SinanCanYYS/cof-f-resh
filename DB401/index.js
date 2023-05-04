require('./database-connection')

const Comment = require('./models/comment')
const Movie = require('./models/movie')
const Theater = require('./models/theater')

async function main() {
  const popularMoviesByGenre = await Movie.aggregate([
    { $unwind: '$genres' },
    { $match: { 'imdb.rating': { $gt: 0 } } },
    { $sort: { 'imdb.rating': -1 } },

    {
      $group: {
        _id: '$genres',
        movies: { $push: { title: '$title', rating: '$imdb.rating' } },
      },
    },
    {
      $project: {
        _id: 0,
        genre: '$_id',
        movies: { $slice: ['$movies', 3] },
      },
    },
  ])
  console.log(JSON.stringify(popularMoviesByGenre, null, 2))
}
main()
