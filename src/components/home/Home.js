import Hero from '../hero/Hero'
import { useLocation } from 'react-router-dom';

const Home = ({movies}) => {

  const location = useLocation();
  const lastViewedMovieId = location.state?.lastViewedMovieId;

  return (
    <Hero movies={movies} lastViewedMovieId={lastViewedMovieId}/>
  )
}

export default Home