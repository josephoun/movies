import React from "react";
import {useEffect, useState} from "react";
import {getMovieDetails} from "../../api";
import {Link, useParams} from "react-router-dom";
import "./style.css";
import {MovieType} from "../../types/MovieType";
import {FaArrowLeft, FaSpinner, FaStar} from "react-icons/fa";
import MovieTitle from "../MovieTitle/MovieTitle";

function MovieDetails() {
    let { id } = useParams<string>();
    const [loading, setLoading] = useState(false);

    const [movie, setMovie] = useState<MovieType>();
    async function fetchMovieDetails() {
        try {
            setLoading(true);
            if (!id) {
                return
            }
            const data = await getMovieDetails(id);
            setMovie(data[0]);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }

    }

    useEffect(() => {
        fetchMovieDetails().then(() => {
            setLoading(false)
        });
    }, [id]);

    return (
        <div className="movie-details" data-testid="movie-details">
            {movie ? (
                <>
                    <div className="movie-details-wrapper">
                        <div className="movie-image-wrapper">
                             <img data-testid={`movieImage-${movie.id}`} src={movie.image} alt={movie.title} />
                        </div>
                        <div className="movie-info">
                            <h3>
                                <MovieTitle movie={movie}/>
                            </h3>
                            {
                                movie.rating &&  (
                                <p className="rating" data-testid={`movieRating-${movie.id}`}>
                                    <FaStar/> {movie.rating} <span>/10</span>
                                </p>
                            )}
                            {
                                movie.synopsis && (
                                    <div className="synopsis" data-testid={`movieSyn-${movie.id}`}>
                                        <p dangerouslySetInnerHTML={{ __html: movie.synopsis }}></p>
                                    </div>
                                )
                            }

                            <Link to="/" className="back-link">
                                <div data-testid={`backButton`} className="back-btn">
                                    <FaArrowLeft/> Back to list
                                </div>
                            </Link>
                        </div>
                    </div>


                </>
            ) : (
                <div>
                    { loading ? (<p>
                        <FaSpinner className="fa-spin" />
                    </p>) : 'Unable to Fetch Movie Details'}
                </div>
            )}
        </div>

    );
}

export default MovieDetails;
