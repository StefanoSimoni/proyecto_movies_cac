document.addEventListener('DOMContentLoaded', () => {
    const moviesDirectorForm = document.getElementById('movies_director-form');
    const moviesDirectorsList = document.getElementById('movies_directors-list');
    const idMoviesInput = document.getElementById('id_movies');
    const idDirectorsInput = document.getElementById('id_directors');

    const fetchMoviesDirectors = async () => {
        const response = await fetch('http://localhost:8080/movies_directors');
        const moviesDirectors = await response.json();

        moviesDirectorsList.innerHTML = '';
        
        for (const moviesDirector of moviesDirectors) {
            const movieResponse = await fetch(`http://localhost:8080/movies/${moviesDirector.id_movies}`);
            const movie = await movieResponse.json();
            
            const directorResponse = await fetch(`http://localhost:8080/directors/${moviesDirector.id_directors}`);
            const director = await directorResponse.json();
            
            const li = document.createElement('li');
            li.innerHTML =`
                <div><strong>Movie:</strong> ${movie[0].title}</div>
                <div><strong>Director:</strong> ${director[0].name} ${director[0].last_name}</div>
                <div>
                    <button class="delete" data-id-movies="${moviesDirector.id_movies}" data-id-directors="${moviesDirector.id_directors}">Delete</button>
                </div>
            `;
            moviesDirectorsList.appendChild(li);
        }
    };

    const saveMoviesDirector = async (moviesDirector) => {
        const response = await fetch('http://localhost:8080/movies_directors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moviesDirector),
        });
        return response.json();
    };

    const deleteMoviesDirector = async (id_movies, id_directors) => {
        const response = await fetch(`http://localhost:8080/movies_directors/${id_movies}/${id_directors}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    moviesDirectorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(moviesDirectorForm);
        const moviesDirector = {};
        formData.forEach((value, key) => {
            moviesDirector[key] = value;
        });
        await saveMoviesDirector(moviesDirector);
        await fetchMoviesDirectors();
        moviesDirectorForm.reset();
    });

    moviesDirectorsList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete')) {
            const id_movies = e.target.dataset.idMovies;
            const id_directors = e.target.dataset.idDirectors;
            await deleteMoviesDirector(id_movies, id_directors);
            await fetchMoviesDirectors();
        }
    });

    fetchMoviesDirectors();
});
