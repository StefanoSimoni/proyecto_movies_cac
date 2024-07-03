document.addEventListener('DOMContentLoaded', () => {
    const moviesWritterForm = document.getElementById('movies_writter-form');
    const moviesWrittersList = document.getElementById('movies_writters-list');
    const idMoviesInput = document.getElementById('id_movies');
    const idWrittersInput = document.getElementById('id_writters');

    const fetchMoviesWritters = async () => {
        const response = await fetch('http://localhost:8080/movies_writters');
        const moviesWritters = await response.json();

        moviesWrittersList.innerHTML = '';
        
        for (const moviesWritter of moviesWritters) {
            const movieResponse = await fetch(`http://localhost:8080/movies/${moviesWritter.id_movies}`);
            const movie = await movieResponse.json();
            
            const writterResponse = await fetch(`http://localhost:8080/writters/${moviesWritter.id_writters}`);
            const writter = await writterResponse.json();
            
            const li = document.createElement('li');
            li.innerHTML =`
                <div><strong>Movie:</strong> ${movie[0].title}</div>
                <div><strong>Writter:</strong> ${writter[0].name} ${writter[0].last_name}</div>
                <div>
                    <button class="delete" data-id-movies="${moviesWritter.id_movies}" data-id-writters="${moviesWritter.id_writters}">Delete</button>
                </div>
            `;
            moviesWrittersList.appendChild(li);
        }
    };

    const saveMoviesWritter = async (moviesWritter) => {
        const response = await fetch('http://localhost:8080/movies_writters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moviesWritter),
        });
        return response.json();
    };

    const deleteMoviesWritter = async (id_movies, id_writters) => {
        const response = await fetch(`http://localhost:8080/movies_writters/${id_movies}/${id_writters}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    moviesWritterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(moviesWritterForm);
        const moviesWritter = {};
        formData.forEach((value, key) => {
            moviesWritter[key] = value;
        });
        await saveMoviesWritter(moviesWritter);
        await fetchMoviesWritters();
        moviesWritterForm.reset();
    });

    moviesWrittersList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete')) {
            const id_movies = e.target.dataset.idMovies;
            const id_writters = e.target.dataset.idWritters;
            await deleteMoviesWritter(id_movies, id_writters);
            await fetchMoviesWritters();
        }
    });

    fetchMoviesWritters();
});
