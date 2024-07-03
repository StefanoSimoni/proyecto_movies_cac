document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movie-form');
    const moviesList = document.getElementById('movies-list');
    const movieIdInput = document.getElementById('movie-id');
    let currentMovieId = null;

    const fetchMovies = async () => {
        const response = await fetch('http://localhost:8080/movies');
        const movies = await response.json();
        moviesList.innerHTML = '';
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.innerHTML =`
                <div><strong>Image URL:</strong> ${movie.image}</div>
                <div><strong>Title:</strong> ${movie.title}</div>
                <div><strong>Date:</strong> ${movie.date}</div>
                <div><strong>Duration:</strong> ${movie.duration}</div>
                <div><strong>Overview:</strong> ${movie.overview}</div>
                <div><strong>Trailer URL:</strong> ${movie.trailer}</div>
                <div><strong>Facebook:</strong> ${movie.facebook}</div>
                <div><strong>Twitter:</strong> ${movie.twitter}</div>
                <div><strong>Instagram:</strong> ${movie.instagram}</div>
                <div><strong>Web:</strong> ${movie.web}</div>
                <div><strong>Status:</strong> ${movie.status}</div>
                <div><strong>Original Language:</strong> ${movie.originalLenguage}</div>
                <div><strong>Budget:</strong> ${movie.budget}</div>
                <div><strong>Revenue:</strong> ${movie.revenue}</div>
                <div>
                    <button class="edit" data-id="${movie.id}">Edit</button>
                    <button class="delete" data-id="${movie.id}">Delete</button>
                </div>
            `;
            moviesList.appendChild(li);
        });
    };

    const saveMovie = async (movie) => {
        const method = currentMovieId ? 'PUT' : 'POST';
        const url = currentMovieId ? `http://localhost:8080/movies/${currentMovieId}` : 'http://localhost:8080/movies';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        });
        return response.json();
    };

    const deleteMovie = async (id) => {
        const response = await fetch(`http://localhost:8080/movies/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    movieForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(movieForm);
        const movie = {};
        formData.forEach((value, key) => {
            movie[key] = value;
        });
        movie.id = movieIdInput.value || undefined;
        await saveMovie(movie);
        await fetchMovies();
        movieForm.reset();
        movieIdInput.value = '';
        currentMovieId = null;
    });

    moviesList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit')) {
            const id = e.target.dataset.id;
            const response = await fetch(`http://localhost:8080/movies/${id}`);
            const movie = await response.json();
            Object.keys(movie).forEach(key => {
                if (movieForm.elements[key]) {
                    movieForm.elements[key].value = movie[key];
                }
            });
            movieIdInput.value = movie[0].id;
            currentMovieId = movie[0].id;;
        }
        if (e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            await deleteMovie(id);
            await fetchMovies();
        }
    });

    fetchMovies();
});
