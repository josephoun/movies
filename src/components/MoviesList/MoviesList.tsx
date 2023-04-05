// MovieList.js

import React, {useEffect, useMemo, useState} from 'react';
import "./style.css";
import SearchInput from "../SearchInput/SearchInput";
import MovieItem from "../MovieItem/MovieItem";
import {getMovies} from "../../api";
import {MovieType} from "../../types/MovieType"
import NoResults from "../NoResults/NoResults";
const cachedQueries: {[key: string]: MovieType[]} = {};

function MoviesList() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [, setLoading] = useState(true);
    const [query, setQuery] = useState('');


    const foundFromCache = (input: string) => {
        if (cachedQueries[input]) {
            setMovies(cachedQueries[input]);
            return true;
        } else {
            return false;
        }
    }

    const applyFilteredMovies = (query: string, results: MovieType[]) => {
        const filtered = results.filter((movie: MovieType) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        cachedQueries[query] = filtered;
        setMovies(filtered);
    }

    async function handleSearch(input: string) {
        try {
            if (typeof input === 'undefined') {
                return;
            }

            if (foundFromCache(input)) {
                return;
            }

            setLoading(true);
            const results = await getMovies();

            if (results && results.length) {
                applyFilteredMovies(input, results)
            }
            setLoading(false);

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const filteredMovies = useMemo(() => {
        if (!query) {
            return movies;
        }

        return movies.filter(function (movie) {
            const title = movie.title.toLowerCase();
            return title.includes(query.toLowerCase());
        });

    }, [movies, query]);

    useEffect(() => {
        handleSearch('')
    }, []);

    return (
        <>
            <div>
                <SearchInput onSearch={handleSearch} query={query} setQuery={setQuery} />
                    {
                        movies?.length ? (
                            <div className="movie-list">
                                <h1 className="title">
                                    Explore your next Movies and tv shows
                                </h1>
                                <ul className="movie-grid">
                                    {filteredMovies.map((movie: MovieType) => (
                                        <MovieItem key={movie.id} movie={movie}/>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                           <NoResults/>
                        )
                    }
            </div>
        </>
    );
}

export default MoviesList;
