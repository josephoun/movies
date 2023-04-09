import React from "react";
import {MovieType} from "../../types/MovieType";

type MovieItemPropsType = {
    movie: MovieType;
}
export default function MovieTitle({movie} : MovieItemPropsType) {
    return (
        <>
             {
                 movie.title ? (
                     movie.title + ( movie.released ? ' (' + movie.released + ')' : '')
                 ) : 'Untitled'
             }
        </>
    )
}

