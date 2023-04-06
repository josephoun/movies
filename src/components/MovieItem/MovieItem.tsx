import {Link} from "react-router-dom";
import React from "react";
import {MovieType} from "../../types/MovieType";
import "./style.css";
import {FaArrowRight} from "react-icons/fa";
import MovieTitle from "../MovieTitle/MovieTitle";

type MovieItemPropsType = {
    movie: MovieType;
}

export default function MovieItem({movie} : MovieItemPropsType) {
    return (
        <li className="movie-item" key={movie.id} data-testid={`movieItem-${movie.id}`}>
            <Link to={`/movie/${movie.id}`}>
                <img src={movie.image} alt={movie.title} />
            </Link>
            <div>
                <h3>
                    <MovieTitle movie={movie}/>
                </h3>
                <div>
                    {
                        movie.rating && (
                            <div><span>&#9733;</span>{movie.rating}</div>
                        )
                    }
                    <Link to={`/movie/${movie.id}`} >
                        <button className="read-more-btn" data-testid={`movieLink-${movie.id}`}>
                            Read More <span><FaArrowRight/></span>
                        </button>
                    </Link>
                </div>

            </div>

        </li>
    )
}
