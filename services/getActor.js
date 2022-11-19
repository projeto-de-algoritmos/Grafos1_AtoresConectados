require('dotenv').config();
const axios = require("axios");
const fs = require('fs');

const options = {
  method: 'GET',
  url: 'https://online-movie-database.p.rapidapi.com/actors/list-most-popular-celebs',
  params: {},
  headers: {
    'X-RapidAPI-Key': process.env.KEY,
    'X-RapidAPI-Host': process.env.HOST
  }
};

const getActorById = async (id) => {
  options.params = { nconst: id };
  const { data: movies } = await axios.request(options);

  return movies
}

const moviesByActor = async (params) => {
  options.params = params;

  // fetch actors
  const { data: actorsFounded } = await axios.request(options);
  const actorsIds = actorsFounded.map(e => e.split('/')[2]);

  // fetch movies by actorId
  options.url = 'https://online-movie-database.p.rapidapi.com/actors/get-all-filmography';
  const actorFilmography = []
  for (const actor of actorsIds.slice(0, 25)) {
    console.log('fetching...')
    try {

      const { id, base, filmography } = await getActorById(actor)

      const filteredFilmography = filmography.map(e => ({
        category: e.category,
        title: e.title,
        image: e.image,
      }))
      actorFilmography.push({ id, name: base.name, image: base.image, filmography: filteredFilmography })
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log('something went wrong')
    }
  }

  // Add the actor's filmography to the file
  fs.writeFile('actors.json', JSON.stringify(actorFilmography), (err) => { })

  return actorFilmography
}


module.exports = moviesByActor;