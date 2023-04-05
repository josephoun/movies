import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import "./style.css";
import { FaSearch, FaTimes } from "react-icons/fa";
import {DEBOUNCE_INTERVAL} from "../../constants";

type SearchInputPropsType = {
    onSearch: (query: string) => void;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function debounce(func: (...args: any[]) => any, delay: number) {
    let timeout: NodeJS.Timeout | undefined = undefined;
    return function(...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(this, args);
        }, delay);
    };
}

function SearchInput({onSearch, query, setQuery} : SearchInputPropsType) {
    const [focused, setFocused] = useState(false);

    const debouncedSearch = useCallback(debounce((term: string) => {
        onSearch(term);
    }, DEBOUNCE_INTERVAL), []);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setQuery(term);
        try {
            await debouncedSearch(term);
        } catch (err) {
            console.log(err);
            setQuery('');
        }
    };

    const clearInput = () => {
        setQuery('');
    };

    const handleClearButton = async () => {
        clearInput();
        try {
            await debouncedSearch('');
        } catch (err) {
            console.log(err);
            setQuery('');
        }
    };

    return (
        <form className="search-form">
            <div className={`search-container ${focused ? "focused" : ""}`}>
                <FaSearch className="search-icon" />
                <input
                    data-testid="search-input"
                    type="text"
                    className="search-input"
                    placeholder="Search movies and TV shows"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {query.length > 0 && (
                    <button data-testid="search-clear-button" type="button" className="clear-button" onClick={handleClearButton}>
                        <FaTimes className="clear-icon" />
                    </button>
                )}
            </div>
        </form>
    );
}

SearchInput.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchInput;
