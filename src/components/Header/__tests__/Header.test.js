import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import Header from "../Header";

describe("Header component", () => {

    it("should match snapshot", () => {
        const { container } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
        );
        expect(container).toMatchSnapshot();
    });
});
