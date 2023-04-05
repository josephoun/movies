import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import NoResults from "../NoResults";

describe("NoResults component", () => {

    it("should match snapshot", () => {
        const { container } = render(
            <BrowserRouter>
                <NoResults />
            </BrowserRouter>,
        );
        expect(container).toMatchSnapshot();
    });
});
