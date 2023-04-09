import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import MovieTitle from "../MovieTitle";

describe("MovieTitle component", () => {

    it("should match snapshot with title and released", () => {
        const { container } = render(
            <BrowserRouter>
                <MovieTitle movie={{title: 'FAKE_TITLE', released: 'FAKE_RELEASED'}} />
            </BrowserRouter>,
        );
        expect(container).toMatchSnapshot();
    });

    it("should match snapshot with title and without released", () => {
        const { container } = render(
            <BrowserRouter>
                <MovieTitle movie={{title: 'FAKE_TITLE'}} />
            </BrowserRouter>,
        );
        expect(container).toMatchSnapshot();
    });

    it("should match snapshot without title and without released", () => {
        const { container } = render(
            <BrowserRouter>
                <MovieTitle movie={{}} />
            </BrowserRouter>,
        );
        expect(container).toMatchSnapshot();
    });
});
