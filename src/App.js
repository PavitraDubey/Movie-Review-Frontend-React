import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import About from './components/about/About';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
          console.log("Updated reviews:", reviews);
      }, [reviews]);

  const getMovies = async () =>{
    
    try
    {

      const response = await api.get("/api/v1/movies");

      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);

        console.log("movie info");
        console.log(singleMovie);
        // Fetch actual reviews
        // const reviewResponses = await Promise.all(
        //     singleMovie.reviewIds.map(async (reviewId) => {
        //       //console.log(reviewId);
        //         const reviewResponse = await api.get(`/api/v1/reviews/${reviewId}`);
        //         return reviewResponse.data;
        //     })
        // );

         // Fetch all reviews using imdbId
         const reviewResponse = await api.get(`/api/v1/reviews/${singleMovie.imdbId}`);
        setReviews(reviewResponse);
        console.log("review response")
        console.log(reviewResponse);
        console.log(reviews);
    } catch (error) {
        console.error(error);
    }
}

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
            <Route path="/about" element={<About/>} ></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;