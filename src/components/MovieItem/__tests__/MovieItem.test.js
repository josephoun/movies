import React from "react";
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes, Router} from "react-router-dom";
import * as api from '../../../api';
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom'
import MovieItem from "../MovieItem";
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../../api'); // mock the API module

describe("MovieItem component", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it("should redirect to movie route when a movie is clicked", async () => {
        const history = createMemoryHistory();

        api.getMovies.mockResolvedValueOnce([
            { id: 1, title: "Movie 1" }
        ]);
        api.getMovieDetails.mockResolvedValueOnce([
            { id: 1, title: "Movie 1" }
        ]);
        const {getByTestId} =  render(
            <Router location={history.location} navigator={history}>
                <MovieItem movie={{id: 1, title: "Movie 1", synopsis: "SYN-1", rating: "RATING-1"}} />
            </Router>
        );

        await screen.findByText("Movie 1");
        const movieLink = getByTestId(`movieLink-1`);
        expect(movieLink).toBeInTheDocument();

        await act(() => {
            fireEvent.click(movieLink);
        })

        expect(history.location.pathname).toBe("/movie/1");
    });
})

