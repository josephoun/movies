import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import MoviesList from "../MoviesList";
import * as api from '../../../api';
import '@testing-library/jest-dom'

jest.mock('../../../api'); // mock the API module

describe("MoviesList component", () => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    })

    it("should display 'NoMatch' component if there are no matching results", () => {
        api.getMovies.mockResolvedValueOnce([]);

        const { getByTestId } = render(
            <MemoryRouter initialEntries={["/"]}>
                <MoviesList />
            </MemoryRouter>
        );

        expect(getByTestId("no-match")).toBeInTheDocument();
    });

    it("should display matching movies if there are results for a given query", async () => {
        api.getMovies.mockResolvedValueOnce([
            { id: 1, title: "Movie 1" },
            { id: 2, title: "Movie 2" },
            { id: 3, title: "Movie 3" },
        ]);

        render(
            <MemoryRouter initialEntries={["/"]}>
                <MoviesList />
            </MemoryRouter>
        );

        await screen.findByText("Movie 1");

        expect(screen.getByText("Movie 1")).toBeInTheDocument();
        expect(screen.getByText("Movie 2")).toBeInTheDocument();
        expect(screen.getByText("Movie 3")).toBeInTheDocument();
    });
});
