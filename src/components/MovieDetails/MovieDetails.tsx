import React from "react";
import {useEffect, useState} from "react";
import {getMovieDetails} from "../../api";
import {Link, useParams} from "react-router-dom";
import "./style.css";
import {MovieType} from "../../types/MovieType";
import {FaArrowLeft, FaStar} from "react-icons/fa";

function MovieDetails() {
    let { id } = useParams<string>();

    const [movie, setMovie] = useState<MovieType>();

    useEffect(() => {
        async function fetchMovieDetails() {
            if (!id) {
                return
            }
            const data = await getMovieDetails(id);
            setMovie(data[0]);
        }

        fetchMovieDetails().then(() => {
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
                            <h2>{movie.title}</h2>
                            <p className="rating" data-testid={`movieRating-${movie.id}`}>
                                <FaStar/> {movie.rating} <span>/10</span>
                            </p>
                            <div className="synopsis" data-testid={`movieSyn-${movie.id}`}>
                                <p dangerouslySetInnerHTML={{ __html: movie.synopsis }}></p>
                            </div>

                            <Link to="/" className="back-link">
                                <div data-testid={`backButton`} className="back-btn">
                                    <FaArrowLeft/> Back to list
                                </div>
                            </Link>
                        </div>
                    </div>


                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
}

export default MovieDetails;
