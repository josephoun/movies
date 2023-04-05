import React from "react";
import { fireEvent, render } from "@testing-library/react";
import SearchInput from "../SearchInput";
import '@testing-library/jest-dom';
import {DEBOUNCE_INTERVAL} from "../../../constants";
import { act } from 'react-dom/test-utils';

jest.spyOn(global, 'setTimeout');

describe("SearchInput component", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.clearAllTimers();

    });
    const onSearch = jest.fn();
    const setQuery = jest.fn();

    it(`should call onSearch function with search query after ${DEBOUNCE_INTERVAL}ms delay`, async () => {
        const { getByTestId } = render(
            <SearchInput onSearch={onSearch} query={""} setQuery={() => {}} />
        );
        const input = getByTestId('search-input');

        fireEvent.change(input, { target: { value: "MOCK_SEARCH_TERM" } });
        jest.advanceTimersByTime(300);
        expect(onSearch).toHaveBeenLastCalledWith("MOCK_SEARCH_TERM");
    });

    it(`should call onSearch function once in an interval of ${DEBOUNCE_INTERVAL}ms`, async () => {
        const onSearch = jest.fn();

        const { getByTestId } = render(
            <SearchInput onSearch={onSearch} query={""} setQuery={() => {}} />
        );

        const input = getByTestId('search-input');

        fireEvent.change(input, { target: { value: "MOCK_SEARCH_TERM1" } });
        fireEvent.change(input, { target: { value: "MOCK_SEARCH_TERM2" } });
        fireEvent.change(input, { target: { value: "MOCK_SEARCH_TERM3" } });
        fireEvent.change(input, { target: { value: "MOCK_SEARCH_TERM4" } });

        jest.runAllTimers();
        expect(onSearch).toHaveBeenCalledTimes(1);
    });

    it('should clear the search query when clear button is clicked', () => {
        const { getByTestId } = render(
            <SearchInput onSearch={onSearch} query={"hello"} setQuery={setQuery} />
        );
        const input = getByTestId('search-input');
        const clearButton = getByTestId('search-clear-button');

        fireEvent.click(clearButton);
        expect(setQuery).toHaveBeenCalledWith('');
        jest.advanceTimersByTime(300);
        expect(input).toHaveTextContent('');
    });
});
