const getMovies = require('./services/getMovies.js');
const getActors = require('./services/getActor.js');

const main = async () => {
  // const movie = await getMovies('batman');
  // console.log(movie);

  await getActors({ homeCountry: 'US', currentCountry: 'US', purchaseCountry: 'US' });
}


main()