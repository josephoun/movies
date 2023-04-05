import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieDetails from "../MovieDetails";
import * as api from "../../../api";
import '@testing-library/jest-dom'

jest.mock("../../../api");

describe("MovieDetails component", () => {
    it("should display movie details and a back button that navigates back", async () => {
        api.getMovieDetails.mockResolvedValueOnce([{
            id: 1,
            title: "Mock Movie Title",
            rating: "9.9",
            image: "http://example.com/poster.jpg",
            synopsis: "http://example.com/poster.jpg",
        }]);

        await render(
            <MemoryRouter initialEntries={["/movie/1"]}>
                <Routes>
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await screen.findByText('Mock Movie Title');
        expect(api.getMovieDetails).toHaveBeenCalledWith("1");

        const title = await screen.findByText("Mock Movie Title");
        const image = await screen.getByTestId("movieImage-1");
        const rating = await screen.getByTestId("movieRating-1");
        const synopsis = await screen.getByTestId("movieSyn-1");
        const backButton = await screen.getByTestId("backButton");

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(rating).toBeInTheDocument();
        expect(synopsis).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();


        await fireEvent.click(backButton);

        expect(window.location.pathname).toBe("/");
    });
});
