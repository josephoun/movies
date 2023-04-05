import React from 'react';
import MoviesList from './components/MoviesList/MoviesList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route exact path="/" element={<MoviesList/>}  />
                    <Route path="/movie/:id" element={<MovieDetails/>} />
                </Routes >
            </div>
        </Router>
    );
}

export default App;
