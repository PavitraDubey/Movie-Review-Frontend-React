import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';


const Hero = ({ movies = [], lastViewedMovieId }) => {

    useEffect(() => {
        console.log("Movies updated:", movies);
    }, [movies]);
    
    const [carouselKey, setCarouselKey] = useState(0);
    const lastViewedIndex = movies.findIndex(movie => movie.imdbId === lastViewedMovieId);
    const [carouselIndex, setCarouselIndex] = useState(lastViewedIndex >= 0 ? lastViewedIndex : 0);
    useEffect(() => {
        // Every time movies update, change key to force re-render
        setCarouselKey(prev => prev + 1);
    }, [movies]);

    const navigate = useNavigate();

    function reviews(movieId)
    {
        localStorage.setItem('lastViewedMovieId', movieId);
        navigate(`/Reviews/${movieId}`);
    }

    console.log("Movies data in Hero:", movies);

  return (
    <div className ='movie-carousel-container'>
      <Carousel key={carouselKey} index={carouselIndex} >
        {
            movies?.map((movie) =>{
                console.log("Rendering Movie:", movie);
                return(
                    <Paper key={movie.imdbId}>
                        <div className = 'movie-card-container'>
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="" />
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                            <FontAwesomeIcon className="play-button-icon"
                                                    icon = {faCirclePlay}
                                                />
                                            </div>
                                        </Link>

                                        <div className="movie-review-button-container">
                                            <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
            })
        }
      </Carousel>
    </div>
  )
}

export default Hero