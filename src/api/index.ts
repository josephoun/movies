export async function getMovies() {
    const response = await fetch('http://localhost:3000/movies');
    if (!response.ok) {
        throw new Error(`Failed to retrieve movies: ${response.status}`);
    }
    return await response.json();
}

export async function getMovieDetails(movieId: string) {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`);
    if (!response.ok) {
        throw new Error(`Failed to retrieve movie [${movieId}]`);
    }
    return await response.json();
}
