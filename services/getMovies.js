require('dotenv').config();
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
  params: { q: '' },
  headers: {
    'X-RapidAPI-Key': process.env.KEY,
    'X-RapidAPI-Host': process.env.HOST
  }
};

const moviesFounded = async (queryString) => {
  options.params.q = queryString;
  const { data } = await axios.request(options);
  return data;
}

module.exports = moviesFounded;