import React from "react";
import "./style.css";

const NoResults = () => {
    return (
        <div data-testid="no-match" className="no-results">
            <p>No matching results</p>
        </div>
    );
};

export default NoResults;
