import "./Reviews.css"
import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { useNavigate } from 'react-router-dom';


import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[movieId]);

    useEffect(() => {
        console.log("Updated reviews:", reviews);
    }, [reviews]);

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try
        {
            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});
            console.log(response.data);

            const updatedReviews = [...(Array.isArray(reviews.data) ? reviews.data : []), { body: rev.value }];
            console.log("Updated Reviews Array:", updatedReviews);
    
            rev.value = "";
    
            setReviews({ ...reviews, data: updatedReviews }); // Update reviews.data, not reviews directly

        }
        catch(err)
        {
            console.error(err);
        }

    }

    const navigate = useNavigate();

    const goBack = () => {
        const lastViewedMovieId = localStorage.getItem('lastViewedMovieId');
        navigate("/", { state: { lastViewedMovieId } }); // Pass movie position
    };

  return (
    <Container className='rev-container'>
        <Row>
            <Col><h3>Reviews</h3></Col>
            <Col className="text-end">
                <button className="back-button" onClick={goBack}>Back</button>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img className="rev-poster" src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
              {reviews && reviews.data && reviews.data.length > 0 ? (
                    reviews.data.map((review, index) => (
                        <div key={index} className="review-container">
                            <Row>
                                <Col>
                                    <p className="review-text">{review.body}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </div>
                    ))
                ) : (
                    <Row>
                        <Col>
                            <p className="no-reviews">No reviews available</p>
                        </Col>
                    </Row>
                )}

            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews